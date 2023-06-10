const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({

    name:
    {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    quantities: [
        {
            size: {
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            quantity: {
                type: String,
                required: true,
                trim: true
            }
        }
    ]
},
    { timestamp: true });

module.exports = mongoose.model('Stocks', stockSchema)