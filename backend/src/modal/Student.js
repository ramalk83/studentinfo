const Sequelize = require('sequelize');
var sequelize = require('./database');
var Role=require('./Role');

var nametable= 'studado';
var Student=sequelize.define(nametable,{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.BIGINT,
    roleId:{
        type: Sequelize.INTEGER,
        refences:{
            modal: Role,
            key:'id'
        }
    }

});

Student.belongsTo(Role);
module.exports = Student;