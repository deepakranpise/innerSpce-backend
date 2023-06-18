const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    id: { type: String, required: true,unique:true },
    clientName: { type: String, required: true },
    invoiceDate: { type: Date, required: true, default: new Date().now },
    type: { type: String, required: true, trim: true },
    products: [{ productId: { type: mongoose.Schema.ObjectId, required: true }, quantity: { type: Number, required: true } }]
},
    { timestamp: true });

module.exports = mongoose.model('Invoice', invoiceSchema)