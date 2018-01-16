"use strict";

module.exports = (sequelize,DataTypes) =>
  sequelize.define("assignments", {   
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,    
    time_completed: DataTypes.DATE,
    is_in_progress: DataTypes.BOOLEAN,
    additional_data: {
        type: DataTypes.JSONB,
        defaultValue: {}
      },
  });
