"use strict";

module.exports = (sequelize,DataTypes) =>
  sequelize.define("tasks", {   
    name: DataTypes.STRING,
    description: DataTypes.TEXT,  
    image: DataTypes.TEXT,
    question: DataTypes.TEXT,
    answer: DataTypes.TEXT,  
    category_id: DataTypes.INTEGER,
    owner: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN
  });
