const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createAt : {
        type: Date,
        default: Date.now,
    },
});

const User = model('User', userSchema);

module.exports = User;