const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    
    hospital_id : {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    hospital_name : {
        type: String,
        required: true,
        max: 255, 
        min: 5
    },
    city_hosp : {
        type : String,
        required : true, 
        max : 1024,
        min : 5
    },
    hosp_doc : {
        type : String,
        required : true, 
        max : 1024,
        min : 5
    }

});

module.exports = mongoose.model('hospital',HospitalSchema);
