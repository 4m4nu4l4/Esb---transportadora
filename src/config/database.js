const Sequelize = require('sequelize');

const database = new Sequelize(
    'produto',
    'root',
    '',
    { host: 'localhost', dialect: 'mysql' }
)

module.exports = database;