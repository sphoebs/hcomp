"use strict";

module.exports = (sequelize,DataTypes) =>
  sequelize.define("tasks", {   
    name: DataTypes.STRING,
    description: DataTypes.TEXT,  
    image: DataTypes.TEXT,
    question: DataTypes.TEXT,
    answer: DataTypes.TEXT,  
    id_category: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN
  });
