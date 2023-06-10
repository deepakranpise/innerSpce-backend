const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({

    party:
    {
        type: String,
        required: true,
        trim: true
    },
    invoiceNo:
    {
        type: String,
        required: true,
        trim: true
    },
    products: [{
        name: { type: String, required: true, trim: true, unique: true },
        code: { type: String, required: true, trim: true, unique: true },
        quantities: [{
            size: { type: String, required: true, trim: true, unique: true },
            quantity: { type: String, required: true, trim: true }
        }]
    }]
},
    { timestamp: true });

module.exports = mongoose.model('Transaction', transactionSchema)