'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";

const db = {};


let sequelize;

  sequelize = new Sequelize(
    process.env.db,
    process.env.username,
    process.env.password,
    {
      host: process.env.host,
      dialect: process.env.dialect
    }
  );


fs
  .readdirSync(__dirname)
  .filter(
  file =>
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });



db.sequelize = sequelize;
db.Sequelize = Sequelize;

// FOREIGN KEY SETTING FOR USER
db.users.hasMany(db.tasks, {
  foreignKey: "id_creator",
  sourceKey: "id"
});
db.users.hasMany(db.assignments, {
  foreignKey: "id_worker",
  sourceKey: "id"
});
db.tasks.belongsTo(db.users, {
  foreignKey: "id_creator",
  targetKey: "id"
});
db.assignments.belongsTo(db.users, {
  foreignKey: "id_worker",
  targetKey: "id"
});

//FOREIGN KEY FOR RUNTYPES
db.runtypes.hasMany(db.runs, {
  foreignKey: "id_runtype",
  sourceKey: "id"
});
db.runs.belongsTo(db.runtypes, {
  foreignKey: "id_runtype",
  targetKey: "id"
});
//FOREIGN KEY FOR TASKS 
db.tasks.hasMany(db.runs, {
  foreignKey: "id_task",
  sourceKey: "id"
});
db.runs.belongsTo(db.tasks, {
  foreignKey: "id_task",
  targetKey: "id"
});

//FOREIGN KEY FOR RUNS

db.runs.hasMany(db.assignments, {
  foreignKey: "id_run",
  sourceKey: "id"
});
db.assignments.belongsTo(db.runs, {
  foreignKey: "id_run",
  targetKey: "id"
});
module.exports = db;
