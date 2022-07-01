const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mariadb',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});


module.exports = sequelize;