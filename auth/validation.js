//Validation
const joi = require('@hapi/joi');

const registerValidation = data =>  {

    const schema = joi.object({
      name : joi.string().min(6).required(),
      email : joi.string().min(6).required().email(),
      password : joi.string().min(6).required()
        /*
        amka : joi.string().min(6).required(),
        First_Name : joi.string().min(6).required(),,
        Last_Name : joi.string().min(6).required(),,
        Birthday :joi.string().min(6).required(),,
        Blood_Type : joi.string().min(6).required(),,
        Photo : joi.string().min(6).required(),,
        kg : joi.string().min(6).required(),,
        Height : joi.string().min(6).required(),,
        Sex : joi.string().min(6).required(),,
        Personal_Doctor : joi.string().min(6).required(),,
        email :joi.string().min(6).required(),,
        City : joi.string().min(6).required(),   */
    });

    //validation 
    return schema.validate(data);
  //const {error} = schema.validate(req.body);
  //if(error) return res.status(400).send(error.details[0].message);
};


const loginValidation = data =>  {

    const schema = joi.object({
        email : joi.string().min(6).required().email(),
        password : joi.string().min(6).required()
    });

    //validation 
    return schema.validate(data);
  //const {error} = schema.validate(req.body);
  //if(error) return res.status(400).send(error.details[0].message);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;