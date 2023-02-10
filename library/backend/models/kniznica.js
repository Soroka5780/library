var Sequelize = require('sequelize');
var sequelize = require('../database');
var kniznica = sequelize.define('kniznica', {
    
    ec_kniznica: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nazov:{
        
            type: Sequelize.STRING,
            field: "nazov"
       
    } ,
    ulica: {
        
        type: Sequelize.STRING,
        field: "ulica"
    },

    mesto: {
        
        type: Sequelize.STRING,
        field: "mesto"
   
    },
    email: {
        
        type: Sequelize.STRING,
        field: "email"
   
    },
    kontakt: {
        
        type: Sequelize.STRING,
        field: "kontakt"
    }
    
   
});



module.exports = kniznica;