const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstName:
    {
        type: String,
        required: true,
        trim: true
    },
    lastName:
    {
        type: String,
        required: false,
        trim: true
    },
    userName: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: false,
        trim: true
    }
},
    { timestamp: true });

module.exports = mongoose.model('Users', userSchema)