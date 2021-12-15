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
        
    appointment_day_time:{
        type : String,
        required : true
    },
    city_doc:{
        type : String,
        required : false
    }
});

module.exports = mongoose.model('appointment',AppointmentSchema);
