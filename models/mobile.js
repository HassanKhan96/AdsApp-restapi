const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const base = require('./testmodel');

const mobileSchema = base.discriminator('mobile', new Schema({
    condition: {type: String}
}));

module.exports = mobileSchema;