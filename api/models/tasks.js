"use strict";

module.exports = (sequelize,DataTypes) =>
  sequelize.define("tasks", {   
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    introduction: DataTypes.TEXT,  
    avatar_image: DataTypes.TEXT,    
    id_creator: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN,
    collaborators: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    }, 
    tutorial: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },
  });

