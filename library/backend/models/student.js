var Sequelize = require('sequelize');
var sequelize = require('../database');
var student = sequelize.define('student', {

    ec_student: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ec_kniznica: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        
    },
    meno:  {
        
        type: Sequelize.STRING,
        field: "meno"
    },
    priezvisko:  {
        
        type: Sequelize.STRING,
        field: "priezvisko"
    },
    ulica:  {
        
        type: Sequelize.STRING,
        field: "ulica"
    },
    mesto:  {
        
        type: Sequelize.STRING,
        field: "mesto"
    },
    email:  {
        
        type: Sequelize.STRING,
        field: "email"
    },
    kontakt:  {
        
        type: Sequelize.STRING,
        field: "kontakt"
    },
    
    vylucenie: {
        type: Sequelize.INTEGER,
        field: "vylucenie"
    }
   
});



module.exports = student;