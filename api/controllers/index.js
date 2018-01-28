const users = require('../models').users;
const tasks = require('../models').tasks;
const assignments = require('../models').assignments;
const tasktypes = require('../models').tasktypes;
const Users = require('./Users');
const Tasks = require('./Tasks');
const Assignments = require('./Assignments');
const TaskTypes = require('./TaskTypes');







module.exports = {
  users : new Users(),
  tasks: new Tasks(),
  assignments: new Assignments(),
  tasktypes: new TaskTypes(),

};
