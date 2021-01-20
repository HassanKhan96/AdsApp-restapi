const base = require('./baseItem');
const { Schema } = require('mongoose');

const electronicSchema = base.discriminator('electronics', new Schema({
    type: String,
    condition: String,
}));

module.exports = electronicSchema;