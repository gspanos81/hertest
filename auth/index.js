const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

dotenv.config({path: './routes/.env'});


//Import Routes

const authRoute = require('./routes/auth');

//const home = requre('./ro')
//connect to the db 
mongoose.connect(process.env.DB_CONNECT, () => 
console.log('connected to the db '));


//Middleware
app.use(express.json());

app.use('/api/user',authRoute);

//app.use('/api/',authRoute);

app.listen(3000, () => console.log('Server Up and running')); 