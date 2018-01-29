'use strict';

module.exports = (sequelize,DataTypes) =>
  sequelize.define('assignments', {   
    id_worker: DataTypes.INTEGER,
    id_task: DataTypes.INTEGER,
    id_run: DataTypes.INTEGER,
    answers: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },    
    is_completed: DataTypes.BOOLEAN,
    is_in_progress: DataTypes.BOOLEAN,   
 
  });
