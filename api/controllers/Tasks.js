const Crud = require("./Crud");
const tasks = require("../models").tasks;
const runs = require('../models').runs;
const aws = require('aws-sdk');
const { url_images, createData, tasksName } = require('../Utility/Utility');
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
        console.log(req.body);
        return this.model
            .create(req.body)
            .then(data => {
                let albumKey = tasksName + (data.id) + '/';
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
                res.status(200).send(JSON.stringify(data.id));
            })
            .catch(error => { console.log(error); res.status(400).send(error) });
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
                        let imageKey = tasksName + task.id + '/' + imageName;
                        let data = createData(buf, imageKey);
                        s3.putObject(data, (err, response) => {
                            if (err) {
                                tmp = res.status(400).send({ message: 'Something Goes Wrong' });
                            }
                            else {
                                let url_image = url_images + imageKey;
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
                        if (req.body.runs.length > 0) {                           
                            let count = 0;
                            req.body.runs.forEach(element => {
                                runs.findById(element.id)
                                    .then(run => {
                                        run.update({
                                            title: element.title,
                                            description: element.description,
                                            introduction: element.introduction,
                                            id_runtype: element.type,
                                            question: element.description,
                                            index: element.index
                                        })
                                            .then(run => {
                                                count += 1;
                                                if (count === req.body.runs.length) {
                                                    console.log('All goes well!');
                                                }
                                            })
                                            .catch(error => tmp = res.status(400).send(error));
                                    })
                                    .catch(error => tmp = res.status(400).send(error));
                            });
                        }
                        console.log("Sono prima del delete di runs");
                        let bodyWithoutRuns = delete req.body[runs];
                        console.log(bodyWithoutRuns);
                        tmp = task
                            .update(bodyWithoutRuns)
                            .then(task=> tmp = res.status(200).send(JSON.stringify(task.id_creator)))
                            .catch(error => tmp = res.status(400).send(error));

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

    deletePhoto(req, res) {
        let tmp = '';
        return this.model
            .findById(req.params.id)
            .then(data => {
                if (!data) {
                    tmp = res.status(404).send({ message: 'Data not found' });
                } else {
                    if (req.body.imgname) {
                        let imageKey = tasksName + data.id + '/' + req.body.imgname;
                        s3.deleteObject({ Key: imageKey }, (err, response) => {
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

    delete(req, res) {
        return this.model
            .findById(req.params.id)
            .then(data => {
                if (!data) {
                    return res.status(400).send({ message: 'Data not found' });
                } else {
                    this.destroyDirectoryTaskPhotos(data.id);
                    return data
                        .destroy()
                        .then(() => res.status(200).send({ message: 'Data destroyed' }))
                        .catch(error => res.status(400).send(error));
                }
            })
            .catch(error => res.status(400).send(error));
    }

    destroyDirectoryTaskPhotos(taskID) {
        let albumKey = tasksName + taskID + '/';
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
                console.log('Successfully deleted album');
            });
        });
    }

}

module.exports = Tasks;