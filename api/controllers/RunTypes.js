const Crud = require("./Crud");
const runtypes = require("../models").runtypes;

class RunTypes extends Crud{
    constructor(){
        super(runtypes);
        this.lastUpdated;
    }
} 

module.exports = RunTypes;