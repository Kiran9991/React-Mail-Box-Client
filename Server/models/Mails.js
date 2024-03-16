const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Mails = sequelize.define('mails', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    receiverGmail: Sequelize.STRING,
    subject: Sequelize.STRING,
    message: Sequelize.STRING
})

module.exports = Mails;