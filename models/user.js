const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: String,
    password: {type: String, required: true},
    name: String,
    profileImage: String,
    phone: Number,
    postedAds: [{type: Schema.Types.ObjectId, ref: 'base'}]
});

const users = mongoose.model('users', UserSchema);

module.exports = users;