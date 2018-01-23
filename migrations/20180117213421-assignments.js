'use strict';
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('assignments',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },               
                time_completed: {
                    type: Sequelize.DATE
                },
                is_in_progress: {
                    type: Sequelize.BOOLEAN
                },
                additional_data: {
                    type: Sequelize.JSONB,
                    defaultValue: {}
                },
                id_task: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            }),

    down: (queryInterface, Sequelize) =>
        queryInterface.dropTable('assignments')

};