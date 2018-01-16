const Crud = require("./Crud");
const categories = require("../models").categories;

class Categories extends Crud{
    constructor(){
        super(categories);
        this.lastUpdated;
    }
} 

module.exports = Categories;