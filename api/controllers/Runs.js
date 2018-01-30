const Crud = require("./Crud");
const runs = require("../models").runs;
const aws = require('aws-sdk');

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
        return this.model
            .create({
                id_task: req.params.taskID
            })
            .then(data => res.status(200).send(data.id))
            .catch(error => res.status(400).send(error));
    }

    update(req, res) {        
        return this.model
            .findById(req.params.id)
            .then(run => {
                let tmp;
                if (!run) {
                    tmp = res.status(400).send({ message: 'Data not found!' });
                } else {
                    if (!req.body.image) {
                        tmp = run
                            .update(req.body)
                            .then(() => res.status(200).send({ message: 'Data updated' }))
                            .catch(error => res.status(400).send(error));
                    }
                    else {
                        const s3 = new aws.S3({ params: { Bucket: process.env.S3_BUCKET } });
                        let data = this.createData(req.body.image);
                        s3.putObject(data, (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(result);
                                //TODO INSERT LINK OF IMAGE
                                tmp = run
                                    .update({
                                        images: {
                                            ...data.images,
                                            [req.body.image.number]:
                                                req.body.image.base64

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

    }
    createData(number,image) {
        //TODO NOME CARTELLA
        let data = {
            Key: number,
            Body: image,
            ContentEncoding: 'base64',
            ContentType: 'image/*'
        };
        return data;
    }
}

module.exports = Runs;