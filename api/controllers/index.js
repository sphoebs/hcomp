const users = require('../models').users;
const tasks = require('../models').tasks;
const assignments = require('../models').assignments;
const runtypes = require('../models').runtypes;
const runs = require('../models').runs;
const Users = require('./Users');
const Tasks = require('./Tasks');
const Assignments = require('./Assignments');
const RunTypes = require('./RunTypes');
const Runs = require('./Runs');







module.exports = {
  users : new Users(),
  tasks: new Tasks(),
  assignments: new Assignments(),
  runtypes: new RunTypes(),
  runs: new Runs()
};
