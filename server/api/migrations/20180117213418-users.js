'use strict';
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                social_id: {
                    type: Sequelize.STRING
                },
                email: {
                    type: Sequelize.STRING
                },
                is_deleted: {
                    type: Sequelize.BOOLEAN
                },
                additional_data: {
                    type: Sequelize.JSONB,
                    defaultValue: {}
                },
                writer: {
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
        queryInterface.dropTable('users')
};