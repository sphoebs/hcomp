const Crud = require("./Crud");
const tasktypes = require("../models").tasktypes;

class TaskTypes extends Crud{
    constructor(){
        super(tasktypes);
        this.lastUpdated;
    }
} 

module.exports = TaskTypes;