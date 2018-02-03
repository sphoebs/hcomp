const Crud = require("./Crud");
const tasks = require("../models").tasks;
const aws = require('aws-sdk');
const { url_images, createData } = require('../Utility/Utility');
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const s3 = new aws.S3({ params: { Bucket: process.env.S3_BUCKET } });

class Tasks extends Crud {
    constructor() {
        super(tasks);
        this.lastUpdated;
    }

    create(req, res) {
        return this.model
            .create(req.body)
            .then(data => res.status(200).send(JSON.stringify(data.id)))
            .catch(error => res.status(400).send(error));
    }


    //TODO TRY S3 AND HOW TO WORK
    update(req, res) {
        let imageName = req.body.imgname;
        let imgBase64 = req.body.base64;
        return this.model
            .findById(req.params.id)
            .then(task => {
                let tmp;
                if (!task) {
                    tmp = res.status(404).send({ message: 'Data not found!' });
                }
                else {
                    if (imgBase64 && imageName) {
                        let buf = new Buffer(imgBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                        let data = createData(buf, imageName);
                        s3.putObject(data, (err, response) => {
                            if (err) {
                                tmp = res.status(400).send({ message: 'Something Goes Wrong' });
                            }
                            else {
                                let url_image = url_images + imageName;
                                console.log(url_image);
                                tmp = task
                                    .update({
                                        avatar_image: url_image
                                    })
                                    .then(() => res.status(200).send({ message: 'All goes well' }))
                                    .catch(error => res.status(400).send(error));
                            }
                        })
                    }
                    else {
                        tmp = task
                            .update(req.body)
                            .then(() => res.status(200).send(JSON.stringify(task.id_creator)))
                            .catch(error => res.status(400).send(error));
                    }
                }
                return tmp;
            })
            .catch(error => res.status(400).send(error));
    }
    creatorRecentTasks(req, res) {
        return this.model
            .findAll({
                where: { id_creator: req.params.id }, order: 'createdAt DESC', limit: 2
            })
            .then(tasks => {
                if (!tasks) {
                    res.status(404).send({ message: 'Not found' });
                }
                else {
                    res.send(200).send(tasks);
                }

            })
            .catch(error => res.status(400).send(error));
    }

    readOne(req, res) {
        console.log(req.params.id);
        return this.model
            .findById(req.params.id)
            .then(data => {
                let tmp;
                if (!data) {
                    tmp = res.status(404).send({ message: 'Data not found!' });
                } else {
                    tmp = res.status(200).send(data);
                }
                return tmp;
            })
            .catch(error => res.status(400).send(error));
    }

    delete(req, res) {
        let tmp = '';
        return this.model
            .findById(req.params.id)
            .then(data => {
                if (!data) {
                    tmp = res.status(404).send({ message: 'Data not found' });
                } else {
                    if (!req.body.image) {
                        return data
                            .destroy()
                            .then(() => tmp = res.status(200).send({ message: 'Data destroyed' }))
                            .catch(error => tmp = res.status(400).send(error));
                    }
                    else {
                        s3.deleteObject({ Key: req.body.imgName }, (err, data) => {
                            if (err) {
                                tmp = res.status(400).send(error);
                            }
                            else {
                                return data
                                    .update({
                                        avatar_image: ''
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


}

module.exports = Tasks;