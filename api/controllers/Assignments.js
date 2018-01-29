const Crud = require("./Crud");
const assignments = require("../models").assignments;

class Assignments extends Crud {
    constructor() {
        super(assignments);
        this.lastUpdated;
    }
    workerHistory(req, res) {
        return this.model
        .readAll({where : {id_worker: req.params.id}})
        .then(assignments => {
            if(!assignments){
                res.send(404).send({message: 'Not found'});
            }
            else{
                res.status(200).send(assignments);
            }
        })
        .catch(error => res.status(400).send(error));
    }

    guestMotivational(req, res){
        return this.model
        .findAll({ 
            order: 'createdAt DESC', limit: 10 
        })
        .then(assignments => {
            if(!assignments){
                res.send(404).send({message: 'Not found'});
            } 
            else{
                res.send(200).send(assignments);
            }
            
        })
        .catch(error => res.status(400).send(error));
    }
    creatorMotivational(req, res){

    }

    workerMotivational(req, res){
        
    }

}

module.exports = Assignments;