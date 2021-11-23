const router = require('express').Router();
const verify = require('./verifyToken');
const {PersonalInfo,UserSchema} = require('../model/User');

router.get('/home',async (req,res) => {

    const emailExist = await UserSchema.findOne({email: req.body.email});
    if(!emailExist) return res.status(400).send("Email DOESNOT Exist Sorry");
    console.log(emailExist);
    res.send({"message":"ouaou ","user": emailExist});

});

router.patch('/', (req,res,next) => {
    //const name = req.params.UserID;
    const UpdateOps = {};
    for(const ops of req.body)
    {
        UpdateOps[ops.propName] = ops.value;

    }
    UserSchema.update({$set:UpdateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    } )
    .catch(err => {
        console.log(err);
        res.send(500).json({error : err});      
    });
})

module.exports = router;