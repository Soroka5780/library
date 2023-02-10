var Sequelize = require('sequelize');
var sequelize = require('../database');
var vypozicky = sequelize.define('vypozicky', {

    ec_vypozicka: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    ec_kniznica: {
        type: Sequelize.INTEGER,
        field: "ec_kniznica",
        foreignKey: true,
    },

    ec_kniha: {
        type: Sequelize.INTEGER,
        field: "ec_kniha",
        foreignKey: true
    },

    ec_student: {
        type: Sequelize.INTEGER,
        field: "ec_student",
        foreignKey: true,
    },

    datum_vypozicane: {
        type: Sequelize.DATE,
        field: "datum_vypozicane"
    },
    datum_predpokladane: {
        type: Sequelize.DATE,
        field: "datum_predpokladane"
    },
    datum_skutocne: {
        type: Sequelize.DATE,
        field: "datum_skutocne"
    }
});


module.exports = vypozicky;