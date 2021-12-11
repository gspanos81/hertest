const mongoose = require('mongoose');

const PerscriptionSchema = new mongoose.Schema({
    prescription : {
        type: String,
        required: true,
        max: 255
    },
    prescription_description : {
        type: String,
        required: true,
        max: 255
    },
    amka_user : {
        type : String,
        required : true
    },
    doctor_email : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Perscription',PerscriptionSchema);