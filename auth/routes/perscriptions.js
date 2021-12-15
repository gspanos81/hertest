const router = require('express').Router();
const Perscription_model = require('../model/perscriptions');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const User = require('../model/user');

router.get('/',verify,async(req,res) => {
   
    const decoded = jwt.decode(req.query.token);    //edw pairnoume to token kai to kanoume decoded
    const Amka_token = decoded.amka;               //pairnoume to amka mesa apo to decoded arxeio
    const amkaExist = await User.findOne({amka:Amka_token});
    
    const pers = await Perscription_model.find({
        'amka_user': {$in:Amka_token }
    })

    res.send(pers);
});

module.exports = router;
