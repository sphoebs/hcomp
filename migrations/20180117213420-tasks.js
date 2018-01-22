'use strict';
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('tasks',
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
                image: {
                    type: Sequelize.TEXT
                },
                question: {
                    type: Sequelize.TEXT
                },
                answer: {
                    type: Sequelize.TEXT
                },
                
                
                is_deleted: {
                    type: Sequelize.BOOLEAN
                },
                is_active: {
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

        queryInterface.dropTable('tasks')
};