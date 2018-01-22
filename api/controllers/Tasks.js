const Crud = require("./Crud");
const tasks = require("../models").tasks;

class Tasks extends Crud{
    constructor(){
        super(tasks);
        this.lastUpdated;
    }
} 

module.exports = Tasks;