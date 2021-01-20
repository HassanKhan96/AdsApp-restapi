const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseOption = {
    discriminatorKey: '_king',
    data: 'data'
}

const baseSchema = new Schema({
    title: {type: String, required: true},
    price: Number,
    description: {type: String, required: true},
    images: [String],
    location: new Schema({ latitude: Number, longitute: Number}),
    city: String,
    datePosted: Date,
    _uid: { type: Schema.Types.ObjectId, ref: 'users'}
}, baseOption);

const baseItem = mongoose.model('base',baseSchema);

module.exports = baseItem;