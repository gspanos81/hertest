const { string, date } = require('@hapi/joi');
const { Int32, Double } = require('bson');
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    amka_user:{
        type: String,
        required: true,
        min: 11,
        max: 11
    },
    email_doc:{
        type: String,
        required: true    },
        
    appointment_day:{
        type : String,
        required : true
    },
    appointment_month:{
        type : Date,
        default: Date.now(),
        required : true
    },
    appointment_year:{
        type : String,
        required : true
    },
    appointment_month:{
        type : String,
        required : true
    },

    city_doc:{
        type : String,
        required : true
    }
});

module.exports = mongoose.model('appointment',AppointmentSchema);
