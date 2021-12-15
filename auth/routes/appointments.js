const router = require('express').Router();
const User = require('../model/user');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const hospital = require('../model/hospital');
const doctors = require('../model/doctor');
const appointments = require('../model/appointment');



router.get('/hospital',async(req,res) => {
    const hospitals_list = await hospital.find().select({"hospital_name":1, "_id": 0});
    console.log(hospitals_list);
    res.send(hospitals_list)

});
router.get('/doctor',async(req,res) => {
    console.log(req.body.hospital_name)
    const vv = req.body.hospital_name
    const doctors_list = await doctors.findOne({"hosp_name_doc":req.body.hospital_name});
    console.log(doctors_list.fullname_doc);
    res.json({"fullname_doc":doctors_list.fullname_doc,"medic_spec":doctors_list.medic_spec});

});
router.get('/date',async(req,res) => {
    const pop = await appointments.aggregate(
        [
          { $match: { email_doc: req.body.email_doc } },
          {
            $group: {
              _id:  "$appointment_day",
              counter: {
                $sum: 1
              }
            }
          }
        ])
    console.log(pop);
    if(pop[1].counter === 2) console.log("winnnnn");
    const tip = []
    pop.forEach(element => {
      if(element.counter >= 6 ) 
      {tip.push(element)}}
      )
    console.log(tip)
    res.send(tip);
    // console.log(req.body.fullname_doc)
    // const vv = req.body.fullname_doc
    // const doctors_list = await doctors.findOne({"hosp_name_doc":req.body.hospital_name});
    // console.log(doctors_list.fullname_doc);
    // res.json({"fullname_doc":doctors_list.fullname_doc,"medic_spec":doctors_list.medic_spec});

});


router.get('/time',async(req,res) => {

const date = req.body.appointment_day;
const time = await appointments.find({"appointment_day":req.body.appointment_day});
console.log(typeof(time));

const tip = []
time.forEach(element => {
  tip.push(element.appointment_time)
})
tip.sort();
res.json(tip);
});
module.exports = router;