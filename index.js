const express = require('express');
const app = express();
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/itemModels/mobile');
require('./models/itemModels/vehicles');
require('./models/itemModels/electronics');
require('./models/user');

const userRoute = require('./routes/userRoute');
const itemRoute = require('./routes/itemRoute');

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET
// })

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

app.use('/uploads/', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/user',userRoute);
app.use('/items', itemRoute);

const PORT = process.env.PORT;
app.listen(PORT);