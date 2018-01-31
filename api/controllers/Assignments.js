const Crud = require("./Crud");
const assignments = require("../models").assignments;
const { readQuery, securityControl } = require('../Utility/Utility');

const id_task = 'id_task';
const id_runType = 'id_runtype';
const id_run = 'id_run';

class Assignments extends Crud {
    constructor() {
        super(assignments);
        this.lastUpdated;
    }
    workerHistory(req, res) {
        return this.model
            .readAll({ where: { id_worker: req.params.id } })
            .then(assignments => {
                if (!assignments) {
                    res.send(404).send({ message: 'Not found' });
                }
                else {
                    res.status(200).send(assignments);
                }
            })
            .catch(error => res.status(400).send(error));
    }

    guestMotivational(req, res) {
        return this.model
            .findAll({
                order: 'createdAt DESC', limit: 10
            })
            .then(assignments => {
                if (!assignments) {
                    res.send(404).send({ message: 'Not found' });
                }
                else {
                    res.send(200).send(assignments);
                }

            })
            .catch(error => res.status(400).send(error));
    }
    creatorMotivational(req, res) {

    }

    workerMotivational(req, res) {

    }


    readAll(req, res) {
        let tmp = '';
        let filterTask = readQuery(id_task, req.url);
        let filterRunType = readQuery(id_runType, req.url);
        let filterRun = readQuery(id_run, req.url);
        let security = securityControl(filterTask, filterRunType, filterRun);

        if (!security) {
            tmp = res.status(400).send({ message: 'Something goes Wrong' });
        }
        else {

            if (filterTask) {
                return this.model
                    .findAll({ where: { id_task: id_task } })
                    .then(data => tmp = res.status(200).send(data))
                    .catch(error => tmp = res.status(400).send(error));
            }

            if (filterRun) {
                return this.model
                    .findAll({ where: { id_run: id_run } })
                    .then(data => tmp = res.status(200).send(data))
                    .catch(error => tmp = res.status(400).send(error));
            }

            if (filterRunType) {
                //TODO FILTER PER RUNTYPE IF NECESSARY
            }
        }
        return tmp;

    }


}

module.exports = Assignments;