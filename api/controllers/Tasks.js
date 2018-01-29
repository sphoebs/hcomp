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
        const s3 = new aws.S3({ params: { Bucket: process.env.S3_BUCKET } });
        let data = this.createData(req.body.image);
        s3.putObject(data, (err, data) => {
            if (err) {
                console.log(err);
            }
            else {
                return this.model
                    .create({req.body})
                    .then(data => res.status(200).send(data))
                    .catch(error => res.status(400).send(error));
            }
        })
    }
    creatorRecentTasks(req,res){

    }
    createData(image) {
        let data = {
            Key: req.body.imageName,
            Body: image,
            ContentEncoding: 'base64',
            ContentType: 'image/*'
        };
        return data;
    }
}

module.exports = Tasks;)