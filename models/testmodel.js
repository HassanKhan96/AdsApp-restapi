const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseOption = {
    discriminatorKey: '_type',
    data: 'data'
}

const baseSchema = new Schema({
    name: String,
    price: Number,
    description: String
}, baseOption);

const baseItem = mongoose.model('base',baseSchema);

module.exports = baseItem;