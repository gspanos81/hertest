const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    },
    date : {
        type : Date, 
        default : Date.now
    }
});

const PersonalSchema = new mongoose.Schema ({
    //_id : mongoose.Schema.Types.ObjectId,
    amla : {
           type : String,
           min : 11,
           max : 11,
           required : true },

    fname : {
        type : String,
        min : 3,
        max : 20,
        required : true },

    lname : {type : String,
           min : 3,
           max : 20,
           required : true },

    BloodType : { 
           type : String,
           min : 11,
           max : 11,
           required : true }, 
    
    Perscriptinos : {
          type : String, 
          
    },

    PersonalDoc : {
          name: { 
            type : String,
            min : 11,
            max : 11,
            required : true }, 

           email : {
            type : String,
            min : 11,
            max : 11,
            required : true
           }, 
           
           tel: {
            type : String,
            min : 11,
            max : 11,
            required : true
           }
    }

});

module.exports.DoctorSchema = mongoose.model('Doctor',DoctorSchema);
module.exports.UserSchema = mongoose.model('User',UserSchema);
module.exports.PersonalSchema = mongoose.model('PersonalSchema',PersonalSchema);
/*
module .exports = {
    allUser:allUser, 
    registerUser:registerUser,

    checkInOut:checkInOut,
    checkInInfo:checkInInfo
}

*/