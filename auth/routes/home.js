const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/user');


router.get('/home',async(req,res) => {

    const amkaExist = await User.findOne({amka:req.body.amka});
    console.log(amkaExist);
    if(amkaExist.length === 0) return res.status(400).send("Amka Does Not Exist, Sorry");
    //Ignore password from sending it to Front
    var userObj = amkaExist.toObject();
    delete userObj.password;
    res.json({message: userObj });

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