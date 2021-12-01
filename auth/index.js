const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path: './routes/.env'});


//Import Routes

const authRoute = require('./routes/auth');

const homeRoute = require('./routes/home');
//connect to the db 
mongoose.connect(process.env.DB_CONNECT1, () => 
console.log('connected to the db '));


//Middleware
app.use(express.json());

app.use('/mydoctor',homeRoute);
app.use('/mydoctor/user',authRoute);



app.listen(process.env.PORT || 3000, () => console.log('Server Up and running')); 