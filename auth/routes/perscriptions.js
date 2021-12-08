const router = require('express').Router();
const Perscription_model = require('../model/perscriptions');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');


router.get('/:amka',async(req,res) => {
    const pip = req.params 
    console.log(pip.amka);
    
    const pers = await Perscription_model.find({
        'amka_user': {$in:pip.amka }
    })

    res.send(pers);
});

module.exports = router;
