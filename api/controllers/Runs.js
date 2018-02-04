const Crud = require("./Crud");
const runs = require("../models").runs;
const { readQuery, url_images, createData } = require('../Utility/Utility');
const aws = require('aws-sdk');
const id_task = 'id_task';
const id_runType = 'id_runtype';
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const s3 = new aws.S3({ params: { Bucket: process.env.S3_BUCKET } });

class Runs extends Crud {
    constructor() {
        super(runs);
        this.lastUpdated;
    }

    create(req, res) {
        return this.model
            .create(req.body)
            .then(data => res.status(200).send(JSON.stringify(data.id)))
            .catch(error => res.status(400).send(error));
    }

    //TODO TRY S3 AND HOW TO WORK WITH IT
    update(req, res) {
        let imageName = req.body.imgname;
        let imageBase64 = req.body.base64;
        console.log(imageName);
        return this.model
            .findById(req.params.id)
            .then(run => {
                let tmp;
                if (!run) {
                    tmp = res.status(404).send({ message: 'Data not found!' });
                }
                else {
                    if (!imageName && !imageBase64) {
                        tmp = run
                            .update(req.body)
                            .then(() => res.status(200).send({ message: 'Data updated' }))
                            .catch(error => res.status(400).send(error));
                    }
                    else {
                        let buf = new Buffer(imageBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                        let data = createData(buf, imageName);
                        s3.putObject(data, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                let url_image = url_images + imageName;
                                //TODO INSERT LINK OF IMAGE
                                tmp = run
                                    .update({
                                        images: {
                                            ...run.images,
                                            [imageName]: url_image
                                        }
                                    })
                                    .then(() => res.status(200).send({ message: 'Data updated' }))
                                    .catch(error => {
                                        console.error(error)
                                        res.status(400).send(error)
                                    });
                            }
                        })
                    }
                }
                return tmp;
            })
            .catch(error => res.status(400).send(error));
    }

    recentRuns(req, res) {
        let tmp = '';
        return this.model
            .findAll({ order: 'createdAt DESC', limit: 2 })
            .then(data => {
                if (!data) {
                    tmp = res.status(404).send({ message: 'Data Not Found' })
                }
                else {
                    tmp = res.status(200).send(data)
                }
            })
            .catch(error =>
                tmp = res.status(400).send(error));
    }

    readAll(req, res) {
        let filterTask = readQuery(id_task, req.url);
        let filterRunType = readQuery(id_runType, req.url);
        let tmp = '';
        if (filterTask && !filterRunType) {
            return this.model
                .findAll({ where: { id_task } })
                .then(data => {
                    if (!data) {
                        tmp = res.status(404).send({ message: 'Data Not Found' })
                    }
                    else {
                        tmp = res.status(200).send(data)
                    }

                })
                .catch(error =>
                    tmp = res.status(400).send(error));
        }
        else {
            if (filterRunType && !filterTask) {
                return this.model
                    .findAll({ where: { id_runtype } })
                    .then(data =>
                        tmp = res.status(200).send(data))
                    .catch(error =>
                        tmp = res.status(400).send(error));
            }
            else {
                tmp = res.status(400).send({ message: 'Something goes Wrong!' })
            }
            return tmp;
        }
    }

    deletePhotos(req, res) {
        let tmp = '';
        let count = 0;          
        return this.model
            .findById(req.params.id)
            .then(data => {
                if (!data) {
                    return tmp = res.status(404).send({ message: 'Data not found' });
                }
                else {
                    if (req.body.deleteAll) {
                        for (key in data.images) {
                            count++;
                            s3.deleteObject({ Key: data.images[key] }, (err, data) => {
                                if (err) {
                                    tmp = res.status(400).send(error);
                                }
                                else {
                                    if (count === Object.keys(data.images).length) {           
                                        return data
                                            .update({
                                                images: {}
                                            })
                                            .then(() => tmp = res.status(200).send({ message: 'Image destroyed' }))
                                            .catch(error => tmp = res.status(400).send(error));
                                    }
                                }
                            });
                        }
                        tmp = res.status(400).send(error);
                    }
                    if (req.body.imgname) {                        
                        s3.deleteObject({ Key: req.body.imgname }, (err, response) => {
                            if (err) {
                                tmp = res.status(400).send(error);
                            }
                            else {                                
                                let images = data.images;                               
                                delete images[req.body.imgname];
                                return data
                                    .update({
                                        images: images
                                    })
                                    .then(() => tmp = res.status(200).send({ message: 'Image destroyed' }))
                                    .catch(error => tmp = res.status(400).send(error));
                            }
                        });
                    }
                }
            })
            .catch(error => res.status(400).send(error));
        return tmp;
    }

}

module.exports = Runs;