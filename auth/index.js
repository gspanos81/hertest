const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path: './routes/.env'});


//Import Routes

const authRoute = require('./routes/auth');

const homeRoute = require('./routes/home');
//connect to the db 
mongoose.connect(process.env.DB_CONNECT, () => 
console.log('connected to the db '));


//Middleware
app.use(express.json());

app.use('/api',homeRoute);
app.use('/api/user',authRoute);



app.listen(3000, () => console.log('Server Up and running')); 