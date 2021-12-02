const { string, date } = require('@hapi/joi');
const { Int32, Double } = require('bson');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    amka : {
        type: String,
        required: true,
        unique: true,
        min: 11,
        max: 11
    },
    password : {
        type : String,
        required : true, 
        max : 1024,
        min : 6
    },
    First_Name : {
        type: String,
        required: true,
        max: 255, 
        min: 6
    },
    Last_Name : {
        type: String,
        required: true,
        max: 255, 
        min: 6
    },
    Birthday : {
        type: Date,
        required: false,
        },
    Blood_Type : {
        type: String,
        required: false,
        max: 255, 
        min: 6
    },
    Photo :{
        type: String,
        required: false,
        },
    kg : {
        type : Number,
        required : false
    },
    Height : {
        type : String,
        required : false
    },
    Sex : {
        type : String,
        required : true
    },
    Personal_Doctor : {
        type : String,
        required : true, 
        },
    email : {
        type: String,
        required: true,
        max: 255, 
        min: 6 
        },
    City : {
        type : String,
        required : false,
        min : 3,
        max : 15
    },
    
   date : {
        type : Date, 
        default : Date.now
    } 

});

const DoctorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email : {
        type: String,
        required: true,
        max: 255, 
        min: 6
    },
    password : {
        type : String,
        required : true, 
        max : 1024,
        min : 6
    }
    
});

module.exports = mongoose.model('Doctor',DoctorSchema);
module.exports = mongoose.model('User',UserSchema);

