"use strict";

module.exports = (sequelize,DataTypes) =>
  sequelize.define("users", {   
    social_id: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    access_type: DataTypes.STRING,    
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN,    
    writer: DataTypes.BOOLEAN
  });
