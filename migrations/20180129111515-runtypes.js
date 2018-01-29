'use strict';
module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('runtypes',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                runtype: {
                    type: Sequelize.STRING
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
        queryInterface.dropTable('runtypes')
};