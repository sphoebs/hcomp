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
                id_worker: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                id_task: {
                    type: Sequelize.INTEGER
                },
                id_run: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'runs',
                        key: 'id'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                answers: {
                    type: Sequelize.ARRAY(Sequelize.TEXT),
                    defaultValue: [] 
                },
                is_completed: {
                    type: Sequelize.BOOLEAN
                },
                is_in_progress: {
                    type: Sequelize.BOOLEAN
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