'use strict';

module.exports = (sequelize,DataTypes) =>
  sequelize.define('runtypes', {   
    runtype: DataTypes.STRING
  });
