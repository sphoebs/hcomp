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
                introduction: {
                    type: Sequelize.TEXT
                },
                avatar_image: {
                    type: Sequelize.TEXT
                },
                id_creator: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                collaborators: {
                    type: Sequelize.ARRAY(Sequelize.INTEGER),
                    defaultValue: []
                },
                tutorial: {
                    type: Sequelize.ARRAY(Sequelize.TEXT),
                    defaultValue: []
                },
                is_live: {
                    type: Sequelize.BOOLEAN
                },
                is_public: {
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