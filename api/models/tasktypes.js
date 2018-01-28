'use strict';

module.exports = (sequelize,DataTypes) =>
  sequelize.define('tasktypes', {   
    tasktype: DataTypes.STRING
  });
