const router = require('express').Router();
const Diagnosis_model = require('../model/diagnosis_m');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const User = require('../model/user');


router.get('/',verify,async(req,res) => {
    const decoded = jwt.decode(req.query.token);    //edw pairnoume to token kai to kanoume decoded
    const Amka_token = decoded.amka;               //pairnoume to amka mesa apo to decoded arxeio
    const amkaExist = await User.findOne({amka:Amka_token});
    
    const pers = await Diagnosis_model.find({
        'amka_user': {$in:Amka_token }
    })
    if(pers.length === 0) res.send({"message":"You don't have any Diagnosis"});
    res.send(pers);
});

module.exports = router;
