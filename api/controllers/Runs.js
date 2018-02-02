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

class Runs extends Crud {
    constructor() {
        super(runs);
        this.lastUpdated;
    }

    create(req, res) {
        console.log(req.body);
        return this.model
            .create(req.body)
            .then(data => res.status(200).send(JSON.stringify(data.id)))
            .catch(error => res.status(400).send(error));
    }

    //TODO TRY S3 AND HOW TO WORK WITH IT
    update(req, res) {
        let number = req.body.number;
        let imageName = req.body.imgname;
        let imageBase64 = req.body.base64;
        return this.model
            .findById(req.params.id)
            .then(run => {
                let tmp;
                if (!run) {
                    tmp = res.status(400).send({ message: 'Data not found!' });
                } else {
                    if (!number && !imageName && !imageBase64) {
                        tmp = run
                            .update(req.body)
                            .then(() => res.status(200).send({ message: 'Data updated' }))
                            .catch(error => res.status(400).send(error));
                    }
                    else {
                        const s3 = new aws.S3({ params: { Bucket: process.env.S3_BUCKET } });
                        let buf = new Buffer(imageBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                        let data = createData(buf, imageName);
                        s3.putObject(data, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(result);
                                let url_image = url_images + imageName;
                                //TODO INSERT LINK OF IMAGE
                                tmp = run
                                    .update({
                                        images: {
                                            ...data.images,
                                            [number]:
                                                url_image
                                        }
                                    })
                                    .then(() => res.status(200).send({ message: 'Data updated' }))
                                    .catch(error => res.status(400).send(error));
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
            .then(data =>
                tmp = res.status(200).send(data))
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
                .then(data =>
                    tmp = res.status(200).send(data))
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





}

module.exports = Runs;