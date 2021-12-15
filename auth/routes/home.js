const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation,ChangePassValidation } = require('../validation');


router.get('/home',verify,async(req,res) => {
    
    const decoded = jwt.decode(req.query.token);    //edw pairnoume to token kai to kanoume decoded
    const Amka_token = decoded.amka;               //pairnoume to amka mesa apo to decoded arxeio
    const amkaExist = await User.findOne({amka:Amka_token});  //to pairname sto findOne gia na vroume to amka sthn vash 
    //console.log(verify);
    if(amkaExist.length === 0) return res.status(400).send("Amka Does Not Exist, Sorry \n Please REgister");
    //Ignore password from sending it to Front
    var userObj = amkaExist.toObject();
    delete userObj.password;
    res.json({message: userObj });

});

router.patch('/home',verify,async (req,res) => {

   
    const decoded = jwt.decode(req.body.token);    //edw pairnoume to token kai to kanoume decoded
    const Amka_token = decoded.amka;               //pairnoume to amka mesa apo to decoded arxeio
    const Userid = await User.find({amka:Amka_token});  //to pairname sto findOne gia na vroume to amka sthn vash

   // console.log(Amka_token);
     
    const updates = req.body;
   
   // console.log(req.body.password);
    
    if(req.body.hasOwnProperty('old_password') && req.body.hasOwnProperty('new_password') ) {
        const UserLogin = await User.findOne({amka :Amka_token});
        if (!UserLogin) return res.status(400).send(" User Doesn't Exist. Please Register");
        const validPass = await bcrypt.compare(req.body.old_password, UserLogin.password);
        if(!validPass) return res.status(400).send("Invalid Password");
        
        new_pass_vali = { new_password:req.body.new_password}
        const {error} = ChangePassValidation(new_pass_vali);
        if(error) return res.status(400).send(error.details[0].message);

        const salt = await bcrypt.genSalt(10);
        const Hashpass = await bcrypt.hash(req.body.new_password, salt);

        var myquery = { amka: Amka_token };
        var newvalues = { $set: {amka: Amka_token, password: Hashpass } };
        const new_pass = User.updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });

        
    }
    delete updates.password;
    delete updates.new_password;
    delete updates.old_password;
    const result = await User.findByIdAndUpdate(Userid,updates, {new: true});
    console.log(result);
    var userObj = result.toObject();
    delete userObj.password;
    //res.json({message: userObj });
    res.send(userObj);

   

   


    //const name = req.params.UserID;
    // const UpdateOps = {};
    // for(const ops of req.body)
    // {
    //     UpdateOps[ops.propName] = ops.value;

    // }
    // const decoded = jwt.decode(req.body.token);    //edw pairnoume to token kai to kanoume decoded
    // const Amka_token = decoded.amka;               //pairnoume to amka mesa apo to decoded arxeio
    // User.findOne({amka:Amka_token}).updateMany({$set:UpdateOps})
    // .exec()
    // .then(result => {
    //     console.log(result);
    //     res.status(200).json(result);
    // } )
    // .catch(err => {
    //     console.log(err);
    //     res.send(500).json({error : err});      
    // });
});

module.exports = router;