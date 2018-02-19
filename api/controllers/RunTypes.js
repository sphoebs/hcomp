const Crud = require("./Crud");
const runtypes = require("../models").runtypes;

class RunTypes extends Crud{
    constructor(){
        super(runtypes);
        this.lastUpdated;
    }

    create(req,res){
        console.log(req.body);
        return this.model
        .create(req.body)
        .then(data => res.send({message :'RunType Created'}))
        .catch(error =>
             res.status(400).send(error))
    }
}

module.exports = RunTypes;