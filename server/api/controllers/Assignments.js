const Crud = require("./Crud");
const assignments = require("../models").assignments;

class Assignments extends Crud{
    constructor(){
        super(assignments);
        this.lastUpdated;
    }
} 

module.exports = Assignments;