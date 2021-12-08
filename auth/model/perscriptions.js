const mongoose = require('mongoose');

const PerscriptionSchema = new mongoose.Schema({
    amka_user : {
        type : String,
        required : true, 
        min : 3
    }, 
    Description : {
        type: String,
        required: true,
        max: 255, 
        min: 5 
    },
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
    }
});

module.exports = mongoose.model('Perscription',PerscriptionSchema);