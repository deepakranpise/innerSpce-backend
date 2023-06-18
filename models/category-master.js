const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true }
},
    { timestamp: true });

module.exports = mongoose.model('Category', categorySchema)