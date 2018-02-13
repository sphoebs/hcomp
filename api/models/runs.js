"use strict";

module.exports = (sequelize,DataTypes) =>
  sequelize.define("runs", {   
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    introduction: DataTypes.TEXT,  
    images: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: []
    },
    question: DataTypes.TEXT,    
    tutorial: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },
    id_runtype: DataTypes.INTEGER,
    id_task: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    max_assignments: DataTypes.INTEGER,
    index: DataTypes.INTEGER
  });
