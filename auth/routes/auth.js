const router = require('express').Router();
const User = require('../model/user');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const {UserSchema} = require('../model/User');
const verify = require('./verifyToken');

router.post('/register', async (req,res) => {
  
  
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

  
  //chcek double mail 
  const amkaExist = await User.findOne({amka: req.body.amka});
  if(amkaExist) return res.status(400).send("Amka Exist Sorry");

  //encrypt Users Password
  const salt = await bcrypt.genSalt(10);
  const Hashpass = await bcrypt.hash(req.body.password, salt);

  const user = new User ({  
    amka : req.body.amka,
    password : Hashpass,
    First_Name : req.body.First_Name,
    Last_Name : req.body.Last_Name,
    Birthday : req.body.Birthday,
    Blood_Type :req.body.Blood_Type,
    Photo : req.body.Photo,
    kg : req.body.kg,
    Height : req.body.Height,
    Sex : req.body.Sex,
    Personal_Doctor : req.body.Personal_Doctor,
    email : req.body.email,
    City : req.body.City
    
})
    try{
        //save user in database
        const savedUser = await user.save();
        //send to the frontend User id and the message
         //create TOKEN
        const token = jwt.sign({_id : user._id}, process.env.TOKEN_S);
         //res.header('auth-token',token).send(token);
        //res.send({ "message" : "Welcome back :" +token});

        res.send({user : user.First_Name, "message": "Welcome to my Doctor mr." + user.Last_Name + "!", "auth-token":token});
    }catch(err){
        res.status(400).send(err);
    } 
})

router.post('/login',async (req,res) => {

    
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check for the email exists in database
    const UserLogin = await User.findOne({amka : req.body.amka});
    if (!UserLogin) return res.status(400).send(" User Doesn't Exist. Please Register");
    
    const validPass = await bcrypt.compare(req.body.password, UserLogin.password);
    if(!validPass) return res.status(400).send("Invalid Password");
    
     //create TOKEN
    const token = jwt.sign({_id : UserLogin._id}, process.env.TOKEN_S);
    //res.header('auth-token',token).send(token);

    res.send({ "status": "Success Login","Token" : token});

   


})

router.get('/look',verify,(req,res)=> {
   
    res.json ({
        posts: { title: "myfirstapp"}
    });

});



module.exports = router;