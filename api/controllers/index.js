const users = require('../models').users;
const tasks = require('../models').tasks;
const assignments = require('../models').assignments;
const categories = require('../models').categories;
const Users = require('./Users');
const Tasks = require('./Tasks');
const Assignments = require('./Assignments');
const Categories = require('./Categories');







module.exports = {
  users : new Users(),
  tasks: new Tasks(),
  assignments: new Assignments(),
  categories: new Categories(),

};
