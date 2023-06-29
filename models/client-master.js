const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
},
    { timestamp: true });

module.exports = mongoose.model('Client', clientSchema)