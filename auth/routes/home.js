const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');


router.get('/home',verify,async(req,res) => {

    const emailExist = await User.findOne({amka:req.body.amka});
    console.log(emailExist);
    if(emailExist.length === 0) return res.status(400).send("Email DOESNOT Exist Sorry");
    res.json({message: emailExist });

});

router.patch('/home',verify,async(req,res,next) => {
    //const name = req.params.UserID;
    const UpdateOps = {};
    for(const ops of req.body)
    {
        UpdateOps[ops.propName] = ops.value;

    }
    User.update({$set:UpdateOps})
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