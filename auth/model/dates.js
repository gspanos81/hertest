const mongoose = require('mongoose');

const DateSchema = new mongoose.Schema({
    
    amka_user : {
        type: String,
        required: true,
        min: 11,
        max: 11
    },
    email_doc : {
        type: String,
        required: true,
        max: 255, 
        min: 6
    },
    date_day : {
        type : String,
        required : true, 
        max : 1024,
        min : 6
    },
    medic_spec : {
        type : String,
        required : true, 
        max : 1024,
        min : 6
    },
    city_doc : {
        type : String,
        required : true, 
        max : 1024,
        min : 6
    }
    
});

module.exports = mongoose.model('Date',DateSchema);