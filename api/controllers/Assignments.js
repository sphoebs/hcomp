const Crud = require("./Crud");
const assignments = require("../models").assignments;

class Assignments extends Crud {
    constructor() {
        super(assignments);
        this.lastUpdated;
    }
    workerHistory(req, res) {

    }

    guestMotivational(req, res){

    }
    creatorMotivational(req, res){

    }

    workerMotivational(req, res){
        
    }

}

module.exports = Assignments;