"use strict";

module.exports = (sequelize,DataTypes) =>
  sequelize.define("users", {   
    facebook_id: DataTypes.STRING,
    accessToken: DataTypes.TEXT,
    google_id: DataTypes.STRING,    
    email: DataTypes.STRING,
    img: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN,
    additional_data: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    writer: DataTypes.BOOLEAN
  });
