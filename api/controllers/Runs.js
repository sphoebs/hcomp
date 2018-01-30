const Crud = require("./Crud");
const runs = require("../models").runs;

class Runs extends Crud{
    constructor(){
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
    recentRuns(req,res){
        
    }
} 

module.exports = Runs;