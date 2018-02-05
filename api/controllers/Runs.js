const Crud = require("./Crud");
const runs = require("../models").runs;
const { readQuery, url_images, createData, tasksName, runsName } = require('../Utility/Utility');
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
            .then(data => {
                let albumKey = tasksName + data.id_task + '/' + runsName + (data.id) + '/';
                s3.headObject({ Key: albumKey }, (err, response) => {
                    if (!err) {
                        console.log('Album already exists.');
                    }
                    if (err.code !== 'NotFound') {
                        console.log('There was an error creating your album: ' + err.message);
                    }
                    s3.putObject({ Key: albumKey }, (err, response) => {
                        if (err) {
                            console.log('There was an error creating your album: ' + err.message);
                        }
                        console.log('Successfully created album.');
                    });
                });
                res.status(200).send(JSON.stringify(data.id))
            })
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
                        let imageKey = tasksName + run.id_task + '/' + runsName + (run.id) + '/' + imageName;
                        let data = createData(buf, imageKey);
                        s3.putObject(data, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                let url_image = url_images + imageKey;
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
        return this.model
            .findById(req.params.id)
            .then(data => {
                if (!data) {
                    tmp = res.status(404).send({ message: 'Data not found' });
                }
                else {
                    if (req.body.deleteAll) {
                        for (let key in data.images) {
                            let images = data.images;
                            delete images[key];
                            return data
                                .update({
                                    images: images
                                })
                                .then(() => {
                                    console.log('Destroyed');
                                    if (Object.keys(data.images).length === 0) {
                                        this.deleteAll(data.id,data.id_task);
                                        tmp = res.status(200).send({ message: 'All images Destroyed' })
                                    }
                                })
                                .catch(error => {
                                    tmp = res.status(400).send(error)
                                });
                        }
                    }
                    if (req.body.imgname) {
                        let imageKey = tasksName + data.id_task + '/' + runsName + (data.id) + '/' + req.body.imgname;
                        s3.deleteObject({ Key: imageKey }, (err, response) => {
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
            .catch(error => tmp = res.status(400).send(error));
        return tmp;
    }

    delete(req, res) {
        console.log(req.params.id);
        return this.model
            .findById(req.params.id)
            .then(data => {
                if (!data) {
                    return res.status(404).send({ message: 'Data not found' });
                } else {
                    if (Object.keys(data.images).length > 0) {
                        this.deleteAll(data.id, data.id_task);
                    }
                    return data
                        .destroy()
                        .then(() => res.status(200).send({ message: 'Data destroyed' }))
                        .catch(error => { console.log(error); res.status(400).send(error) });
                }
            })
            .catch(error => res.status(400).send(error));
    }

    deleteAll(runsID, tasksID) {
        let albumKey = tasksName + tasksID + '/' + runsName + runsID + '/';
        console.log("Entro in delete ALL");
        s3.listObjects({ Prefix: albumKey }, (err, response) => {
            if (err) {
                console.log('There was an error deleting your album: ', err.message);
            }
            let objects = response.Contents.map((object) => {
                return { Key: object.Key };
            });
            s3.deleteObjects({
                Delete: { Objects: objects, Quiet: true }
            }, (err, response) => {
                if (err) {
                    console.log('There was an error deleting your album: ', err.message);
                }
                console.log('Successfully deleted album.');
            });
        });
    }
}

module.exports = Runs;