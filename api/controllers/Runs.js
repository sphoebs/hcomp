const Crud = require("./Crud");
const runs = require("../models").runs;

class Runs extends Crud{
    constructor(){
        super(runs);
        this.lastUpdated;
    }
} 

module.exports = Runs;