const express = require('express');
const app = express();
require('dotenv').config();
const itemRoute = require('./routes/itemRoute');

app.use('/',itemRoute);

const PORT = process.env.PORT;
app.listen(PORT);