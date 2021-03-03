const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const base = require('./baseItem');

const mobileSchema = base.discriminator('mobile', new Schema({
    type: String,
    condition: {type: String, required: true},
    make: {type: String, required: true}
}));

module.exports = mobileSchema;