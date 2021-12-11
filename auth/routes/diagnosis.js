const router = require('express').Router();
const Diagnosis_model = require('../model/diagnosis_m');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');


router.get('/:amka',async(req,res) => {
    const amka_url = req.params 
    console.log(amka_url.amka);
    
    const pers = await Diagnosis_model.find({
        'amka_user': {$in:amka_url.amka }
    })
    if(pers.length === 0) res.json({"message":"You don't have any Diagnosis"});
    res.send(pers);
});

module.exports = router;
