const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const {UserSchema} = require('../model/User');
const verify = require('./verifyToken');

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
         //create TOKEN
        const token = jwt.sign({_id : user._id}, process.env.TOKEN_S);
         //res.header('auth-token',token).send(token);
        //res.send({ "message" : "Welcome back :" +token});

        res.send({user : user._id, "message": "Welcome to my Doctor mr." + user.name + "!", "auth-token":token});
    }catch(err){
        res.status(400).send(err);
    } 
})

router.post('/login',async (req,res) => {

    
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check for the email exists in database
    const UserLogin = await User.findOne({amka : req.body.email});
    if (!UserLogin) return res.status(400).send(" User Doesn't Exist. Please Register");
    
    const validPass = await bcrypt.compare(req.body.password, UserLogin.password);
    if(!validPass) return res.status(400).send("Invalid Password");
    
     //create TOKEN
    const token = jwt.sign({_id : UserLogin._id}, process.env.TOKEN_S);
    //res.header('auth-token',token).send(token);

    res.send({ "message" : "Welcome back :" +token});

   


})

router.get('/look',verify,(req,res)=> {
   
    res.json ({
        posts: { title: "myfirstapp"}
    });

});



module.exports = router;