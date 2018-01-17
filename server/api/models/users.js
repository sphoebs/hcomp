"use strict";

module.exports = (sequelize,DataTypes) =>
  sequelize.define("users", {   
    social_id: DataTypes.STRING,    
    email: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN,
    additional_data: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    writer: DataTypes.BOOLEAN
  });
