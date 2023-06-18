const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    size: { type: Array, required: true, trim: true },
    categoryId: { type: mongoose.Schema.ObjectId, required: true, trim: true }
},
    { timestamp: true });

module.exports = mongoose.model('Size', categorySchema)