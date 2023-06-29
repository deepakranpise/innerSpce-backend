const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const productMasterSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    categoryId:
    {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    subCategoryId:
    {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    size: {
        type: String,
        required: true,
        trim: true
    }
},
    { timestamp: true });

module.exports = mongoose.model('Product-Master', productMasterSchema)