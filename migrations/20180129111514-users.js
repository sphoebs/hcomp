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
                accessToken: {
                    type: Sequelize.STRING
                },
                access_type: {
                    type: Sequelize.STRING
                },
                email: {
                    type: Sequelize.STRING
                },
                name: {
                    type: Sequelize.STRING
                },
                img: {
                    type: Sequelize.STRING
                },
                is_deleted: {
                    type: Sequelize.BOOLEAN
                },                
                creator: {
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