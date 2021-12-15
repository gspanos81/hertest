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
  const hospname_url = req.query.hospital_name
  console.log(hospname_url);
  
    const vv = hospname_url
    const doctors_list = await doctors.find({"hosp_name_doc":vv}).select({"fullname_doc":1,"email_doc":1,"_id":0});
    res.send(doctors_list);
    // res.send({"fullname_doc":doctors_list.fullname_doc,"email_doc":doctors_list.email_doc});

});
// router.get('/date',async(req,res) => {
//     const pop = await appointments.aggregate(
//         [
//           { $match: { email_doc: req.body.email_doc } },
//           {
//             $group: {
//               _id:  "$appointment_day",
//               counter: {
//                 $sum: 1
//               }
//             }
//           }
//         ])
//     console.log(pop);
//     if(pop[1].counter === 2) console.log("winnnnn");
//     const tip = []
//     pop.forEach(element => {
//       if(element.counter >= 6 ) 
//       {tip.push(element)}}
//       )
//     console.log(tip)
//     res.send(tip);
//     // console.log(req.body.fullname_doc)
//     // const vv = req.body.fullname_doc
//     // const doctors_list = await doctors.findOne({"hosp_name_doc":req.body.hospital_name});
//     // console.log(doctors_list.fullname_doc);
//     // res.json({"fullname_doc":doctors_list.fullname_doc,"medic_spec":doctors_list.medic_spec});

// });


router.get('/date',async(req,res) => {
const email_doc = req.body.email_doc
const time = await appointments.find({email_doc:email_doc}).select({"appointment_day_time":1,"_id": 0});
console.log(typeof(time));
res.send(time.sort());
// const tip = []
// time.forEach(element => {
//   tip.push(element.appointment_time)
// })
// tip.sort();
// res.json(tip);
});

router.post('/appointment',verify,async(req,res) => {
  const decoded = jwt.decode(req.body.token);    //edw pairnoume to token kai to kanoume decoded
  const Amka_token = decoded.amka;               //pairnoume to amka mesa apo to decoded arxeio
  const amkaExist = await User.findOne({amka:Amka_token});  //to pairname sto findOne gia na vroume to amka sthn vash 
  
  const date = req.body.date;
  const doctor_email=req.body.email_doc;
  const dateExist = await appointments.findOne({email_doc:doctor_email,appointment_day_time: req.body.date});
  if(dateExist) return res.status(400).send("Date Exist Sorry");
  const book = new appointments ({  
    amka_user : Amka_token,
    appointment_day_time : date,
    email_doc : doctor_email
      
})
try{
  //save user in database
  const savedBook = await book.save();
  
  res.send({"message":"Appointment is booked"});
}catch(err){
  res.status(400).send(err);
} 
  
  });
module.exports = router;