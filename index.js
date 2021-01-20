const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
require('./models/itemModels/mobile');
require('./models/itemModels/vehicles');
require('./models/itemModels/electronics');
require('./models/user');

const userRoute = require('./routes/userRoute');

mongoose.connect(
    process.env.MONGOURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
    if(!err){
        console.log('Connected to db sucessfully');
    }
});

app.use('/user',userRoute);

const PORT = process.env.PORT;
app.listen(PORT);