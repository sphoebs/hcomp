const Crud = require("./Crud");
const tasks = require("../models").tasks;
const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class Tasks extends Crud {
    constructor() {
        super(tasks);
        this.lastUpdated;
    }

    create(req, res) {
        return this.model
            .create(req.body)
            .then(data => res.status(200).send(data.id_creator))
            .catch(error => res.status(400).send(error));
    }

    update(req, res) {
        //IF UPDATE IS AN IMAGE
        if (req.body.image) {
            const s3 = new aws.S3({ params: { Bucket: process.env.S3_BUCKET } });
            let data = this.createData(req.body.image);
            s3.putObject(data, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    //UPDATE TASK TABLE WITH IMAGES
                }
            })
        }
        else {
            return this.model
            .findById(req.params.id)
            .then(data => {
              let tmp;
              if (!data) {
                tmp = res.status(400).send({ message: 'Data not found!' });
              } else {
                tmp = data
                  .update(req.body)
                  .then(() => res.status(200).send(JSON.stringify(data.id_creator)))
                  .catch(error => res.status(400).send(error));
              }
              return tmp;
            })
            .catch(error => res.status(400).send(error));
        }
    }
    creatorRecentTasks(req, res) {
        return this.model
            .findAll({
                where: { id_creator: req.params.id }, order: 'createdAt DESC', limit: 2
            })
            .then(tasks => {
                if (!tasks) {
                    res.send(404).send({ message: 'Not found' });
                }
                else {
                    res.send(200).send(tasks);
                }

            })
            .catch(error => res.status(400).send(error));
    }

    createData(image) {
        //TODO NOME CARTELLA
        let data = {
            Key: req.body.imageName,
            Body: image,
            ContentEncoding: 'base64',
            ContentType: 'image/*'
        };
        return data;
    }
}

module.exports = Tasks;