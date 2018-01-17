'use strict';

module.exports = (sequelize,DataTypes) =>
  sequelize.define('assignments', {   
    id_user: DataTypes.INTEGER,
    id_task: DataTypes.INTEGER,    
    time_completed: DataTypes.DATE,
    is_in_progress: DataTypes.BOOLEAN,
    additional_data: {
        type: DataTypes.JSONB,
        defaultValue: {}
      },
  });
