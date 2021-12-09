const router = require('express').Router();
const Perscription_model = require('../model/perscriptions');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');


router.get('/:amka',async(req,res) => {
    const amka_url = req.params 
    console.log(amka_url.amka);
    
    const pers = await Perscription_model.find({
        'amka_user': {$in:amka_url.amka }
    })

    res.send(pers);
});

module.exports = router;
