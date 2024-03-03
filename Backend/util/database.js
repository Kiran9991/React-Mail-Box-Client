const Sequelize = require('sequelize');

const sequelize = new Sequelize('mail-box-client','root','nodecomplete', {
    dialect: 'mysql', 
    host: 'localhost'
})

module.exports = sequelize;