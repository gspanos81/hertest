//Validation
const joi = require('@hapi/joi');

const registerValidation = data =>  {

    const schema = joi.object({
      amka : joi.string().min(11).required(),
      email : joi.string().min(6).required().email(),
      password : joi.string().min(6).required(),
      First_Name : joi.string().min(3).required(),
      Last_Name : joi.string().min(3).required(),
      Birthday : joi.date().optional(),
      Blood_Type : joi.string().min(6).required(),
      Photo : joi.string().min(6).optional(),  
      kg : joi.number().integer().positive().optional(),
      Height : joi.number().optional(),
      Sex : joi.string().min(6).required(),
      Personal_Doctor : joi.string().min(6).required(),
      City : joi.string().min(6).optional()  
    });

    //validation 
    return schema.validate(data);
  //const {error} = schema.validate(req.body);
  //if(error) return res.status(400).send(error.details[0].message);
};


const loginValidation = data =>  {

    const schema = joi.object({
        amka : joi.string().min(11).max(11).required(),
        password : joi.string().min(6).required()
    });

    //validation 
    return schema.validate(data);
  //const {error} = schema.validate(req.body);
  //if(error) return res.status(400).send(error.details[0].message);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;