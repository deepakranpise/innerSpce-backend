const invoiceSchema = require('../models/invoice');
const stockSchema = require('../models/stock');
const mongoose = require('mongoose')



const { addStock } = require('./stock');

const addTransaction = async (req, res) => {
    try {
        const Transaction = new invoiceSchema({
            clientName: req.body.clientName,
            id: req.body.id,
            invoiceDate: req.body.invoiceDate,
            type: req.body.type,
            products: req.body.products
        })
        const transactionSave = await Transaction.save()

        const bulkWriteData = []
        req.body.products.forEach(stockUpdate => {
            let count = stockUpdate.quantity || 0;
            if (req.body.type === "sell") {
                count = stockUpdate.quantity * -1
            }
            const data = {
                updateOne: {filter:{productId:new mongoose.Types.ObjectId(stockUpdate.productId)},
                    update:{$inc:{quantity: count }},
                    upsert:true
                }
            }
            bulkWriteData.push(data)
        });
        if (bulkWriteData.length > 0) {
            const updateStockCollection = await stockSchema.bulkWrite(bulkWriteData);
            return res.send({
                status: 200,
                message: "transaction added successfully",
                data: updateStockCollection
            })
        }
    }
    catch (err) {
        console.log(err)
        return res.send({
            status: 400, message: err, process: 'transaction'
        });
    }
}

const getTransaction = async (req, res) => {
    try {
        console.log("asdasdsa")
        transactionSchema.find()
            .then(async transactions => {

                if (transactions) {
                    return res.send({ status: 200, data: transactions, totalMessages: transactions.length, process: 'transactions' })
                } else {
                    return res.send({ status: 200, data: transactions, message: 'transactions does not exist', process: 'transactions' })
                }
            })
            .catch(err => {
                console.log(err)
                return res.send({ status: 400, message: err, process: 'transactions' })
            })
    }
    catch (err) {
        console.log(err)
        return res.send({
            status: 400, message: err, process: 'transactions'
        });
    }
}


module.exports = { addTransaction, getTransaction }