const Crud = require("./Crud");
const tasks = require("../models").tasks;
const runs = require("../models").runs;
const aws = require("aws-sdk");

class Tasks extends Crud {
  constructor() {
    super(tasks);
    this.lastUpdated;
  }
 ...
  readOne(req, res) {
    this.model
      .findById(req.params.id)
      .then(data => {
        let tmp;
        if (!data) {
          tmp = res.status(404).send({
            message: "Data not found!"
          });
        } else {
          tmp = res.status(200).send(data);
        }
        return tmp;
      })
      .catch(error => res.status(400).send(error));
  }
}

module.exports = Tasks;
