var  Sequelize  = require('Sequelize');

const database = new Sequelize(
    'library',
    'root', //meno
    'root', { //heslo
    host: 'localhost',
    dialect: 'mysql'
}
);

database.sync();
module.exports = database;
