const mongoose = require('mongoose');

const DiagnosisSchema = new mongoose.Schema({
    diagnosis : {
        type : String,
        required : true, 
        min : 3
    }, 
    diagnosis_description : {
        type: String,
        required: true,
        max: 255, 
        min: 5 
    },
    amka_user : {
        type: String,
        required: true,
        max: 255, 
        min: 5 
    },
    doctor_email : {
        type: String,
        required: true,
        min: 5,
        max: 255
    }
});

module.exports = mongoose.model('Diagnosis',DiagnosisSchema);