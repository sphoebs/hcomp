'use strict';
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('runs',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: {
                    type: Sequelize.STRING
                },
                description: {
                    type: Sequelize.TEXT
                },
                introduction: {
                    type: Sequelize.TEXT
                },
                images: {
                    type: Sequelize.ARRAY(Sequelize.JSONB),
                    defaultValue: []
                },
                question: {
                    type: Sequelize.TEXT
                },
                tutorial: {
                    type: Sequelize.ARRAY(Sequelize.TEXT),
                    defaultValue: []
                },
                statistics: {
                    type: Sequelize.JSONB,
                    defaultValue: {}
                },
                max_emotions: {
                    type: Sequelize.TEXT
                },
                id_runtype: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'runtypes',
                        key: 'id'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                id_task: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'tasks',
                        key: 'id'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                is_deleted: {
                    type: Sequelize.BOOLEAN
                },
                is_active: {
                    type: Sequelize.BOOLEAN
                },
                max_assignments: {
                    type: Sequelize.INTEGER
                },
                max_images: {
                    type: Sequelize.INTEGER
                },
                index: {
                    type: Sequelize.INTEGER
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
        queryInterface.dropTable('runs')
};