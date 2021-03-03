const { Schema } = require('mongoose');
const base = require('./baseItem');

const vehicle = base.discriminator('vehicles', new Schema ({
    type: String,
    modelYear: Number,
    condition: String,
    make: String
}));

module.exports = vehicle;