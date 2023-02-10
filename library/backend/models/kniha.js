var Sequelize = require('sequelize');
var sequelize = require('../database');
var kniha = sequelize.define('kniha', {

    ec_kniha: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ec_kniznica: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        
    },

    nazov: {
        type: Sequelize.STRING,
        field: "nazov"
    },

    autor: {
        type: Sequelize.STRING,
        field: "autor"
    },

    zaner: {
        type: Sequelize.STRING,
        field: "zaner"
    },

    popis: {
        type: Sequelize.STRING,
        field: "popis"
    },

    vylucenie: {
        type: Sequelize.INTEGER,
        field: "vylucenie"
    }
});


module.exports = kniha;