const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../model/User');


router.post('/register', async (req,res) => {
  
  
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

  
  //chcek double mail 
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send("Email Exist Sorry");

  //encrypt Users Password
  const salt = await bcrypt.genSalt(10);
  const Hashpass = await bcrypt.hash(req.body.password, salt);

    const user = new User ({
        name : req.body.name,
        email : req.body.email,
        password : Hashpass
    })
    try{
        //save user in database
        const savedUser = await user.save();
        //send to the frontend User id and the message
        res.send({user : user._id, "message": "Welcome to my Doctor mr." + user.name + "!"});
    }catch(err){
        res.status(400).send(err);
    } 
})

router.post('/login',async (req,res) => {

    
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check for the email exists in database
    const UserLogin = await User.findOne({email : req.body.email});
    if (!UserLogin) return res.status(400).send(" User Doesn't Exist. Please Register");
    
    const validPass = await bcrypt.compare(req.body.password, UserLogin.password);
    if(!validPass) return res.status(400).send("Invalid Password");
    res.send({ "message" : "Welcome back :" + UserLogin.name});

    //create TOKEN
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_S);
    res.header('auth-token',token).send(token);


})


module.exports = router;