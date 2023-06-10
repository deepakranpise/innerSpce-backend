const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const productMasterSchema = new mongoose.Schema({

    category:
    {
        type: String,
        required: true,
        trim: true
    },
    subCategory:
    {
        type: String,
        required: true,
        trim: true
    },
    products: [{
        name: { type: String, required: true, trim: true, unique: true },
        code: { type: String, required: true, trim: true, unique: true },
    }]
},
    { timestamp: true });

module.exports = mongoose.model('Product-Master', productMasterSchema)