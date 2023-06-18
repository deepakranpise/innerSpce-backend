const stock = require('../models/stock');
const stockSchema = require('../models/stock');
var async = require("async");

const addStock = async (data) => {
    try {

        data.forEach(async d => {
            console.log(d)
            d.quantities.forEach(async q => {


                const Stock = new stockSchema({
                    name: d.name + "|" + q.size,
                    code: d.code,
                    quantity: q.quantity
                })
                await stockSchema.findOne({ name: d.name + "|" + q.size })
                    .then(async res => {
                        if (res) {

                        } else {
                            await Stock.save().then((stock) => {
                                console.log(stock)
                            })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    })

            })
        })
    }
    catch (err) {
        console.log(err)
        return ({
            status: 400, message: err, process: 'stock'
        });
    }
}

const getStocks = async (req, res) => {
    try {
        stockSchema.find()
            .then(async stocks => {

                if (stocks) {
                    let grouped = {};
                    stocks.forEach(function (a) {
                        console.log(a)
                        grouped[a.code] = grouped[a.code] || [];
                        grouped[a.code].push({
                            name: a.name,
                            code: a.code,
                            quantity: a.quantity,
                        });
                    });


                    return res.send({ status: 200, data: grouped, totalMessages: stocks.length, process: 'stock1' })
                } else {
                    return res.send({ status: 200, data: stocks, message: 'stocks does not exist', process: 'stock' })
                }
            })
            .catch(err => {
                console.log(err)
                return res.send({ status: 400, message: err, process: 'stock' })
            })
    }
    catch (err) {
        console.log(err)
        return res.send({
            status: 400, message: err, process: 'stock'
        });
    }
}


const addKey = async (stocks) => {

    await stocks.forEach(s => {
        console.log(s)
        s.type.filter(t => {
            s[t.size] = t.value
        })
    })
    console.log(stocks)
    return stocks;
}


module.exports = { addStock, getStocks }