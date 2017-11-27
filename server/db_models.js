const uuid = require('node-uuid');
const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    const Users = sequelize.define('users', {
        ID: {
            type: Sequelize.STRING,
            defaultValue: (()=>{return uuid.v4();}),
            primaryKey: true
        },
        FACEBOOK_ID: {
            type: Sequelize.STRING
        },
        GOOGLE_ID: {
            type: Sequelize.STRING
        },
        EMAIL: {
            type: Sequelize.STRING
        },
        IS_DELETED: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        Additional_Data: {
            type: Sequelize.JSON
        }
    })
};
