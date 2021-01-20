const {Schema} = require('mongoose');
const base = require('./testmodel');

const carsSchema = base.discriminator('cars', new Schema({
    condition: {type: String},
    model: {type: String}
}));

module.exports = carsSchema;