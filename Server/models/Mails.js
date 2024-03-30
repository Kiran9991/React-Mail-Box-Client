const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Mails = sequelize.define('mails', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sender: Sequelize.STRING,
    receiver: Sequelize.STRING,
    subject: Sequelize.STRING,
    message: Sequelize.STRING(1000),
    media: Sequelize.BLOB,
    viewed: Sequelize.STRING
})

module.exports = Mails;