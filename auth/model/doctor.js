const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    email_doc : {
        type: String,
        required: true,
        max: 255, 
        min: 5 
    },
    fullname_doc : {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    medic_spec : {
        type : String,
        required : true, 
        min : 6
    },
    city_doc : {
        type : String,
        required : true, 
        min : 3
    }

});

module.exports = mongoose.model('Doctor',DoctorSchema);