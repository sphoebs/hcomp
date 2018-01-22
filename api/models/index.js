'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.DATABASE_URL || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


let sequelize;

sequelize = new Sequelize(process.env.DATABASE_URL);


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
  foreignKey: "id_user",
  sourceKey: "id"
});
db.users.hasMany(db.assignments, {
  foreignKey: "id_user",
  sourceKey: 'id'
});
db.tasks.belongsTo(db.users, {
  foreignKey: "id_user",
  targetKey: "id"
});
db.assignments.belongsTo(db.users, {
  foreignKey: "id_user",
  targetKey: "id"
});

//FOREIGN KEY FOR CATEGORIES
db.categories.hasMany(db.tasks, {
  foreignKey: "id_category",
  sourceKey: "id"
});
db.tasks.belongsTo(db.categories, {
  foreignKey: "id_category",
  targetKey: "id"
});
//FOREIGN KEY FOR TASKS 
db.tasks.hasMany(db.assignments, {
  foreignKey: "id_task",
  sourceKey: "id"
});
db.assignments.belongsTo(db.tasks, {
  foreignKey: "id_task",
  targetKey: "id"
});


module.exports = db;
