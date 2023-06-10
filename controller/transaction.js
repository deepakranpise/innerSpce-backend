const transactionSchema = require('../models/transaction');
const { addStock } = require('./stock');

const addTransaction = async (req, res) => {
    try {
        const Transaction = new transactionSchema({
            party: req.body.party,
            invoiceNo: req.body.invoiceNo,
            products: req.body.products
        })
        await Transaction.save().then(async (transaction) => {

            let AddStock = await addStock(req.body.products);
            console.log(AddStock);


            return res.send({
                status: 200,
                message: "transaction added successfully",
                data: transaction
            })
        })
            .catch((err) => {
                console.log(err)
                return res.send({
                    status: 400, message: err, process: 'transaction'
                });
            })
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