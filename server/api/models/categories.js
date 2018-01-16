"use strict";

module.exports = (sequelize,DataTypes) =>
  sequelize.define("categories", {   
    category_name: DataTypes.STRING
  });
