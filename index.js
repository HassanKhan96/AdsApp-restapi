const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const itemRoute = require('./routes/itemRoute');
const cars = require('./models/cars');
const mobile = require('./models/mobile');
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

app.use('/',itemRoute);
app.use('/car', (req,res,next) => {
    const order = new cars({
        name: 'Civics',
        price: 500000,
        description: 'new car',
        model: '2021'
    }).save().then(car => res.json(car)).catch(e => console.log(e))
});

app.use('/mobile', (req,res,next) => {
    const order = new mobile({
        name: 'Nokia',
        price: 5000,
        description: 'new mobile',
        condition: 'used'
    }).save().then(mobile => res.json(mobile)).catch(e => console.log(e))
});

const PORT = process.env.PORT;
app.listen(PORT);