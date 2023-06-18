const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({

    productId:
    {
        type: mongoose.Schema.ObjectId,
        required: true,
        unique: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    }
},
    { timestamp: true });

module.exports = mongoose.model('Stocks', stockSchema)