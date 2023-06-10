const stock = require('../models/stock');
const stockSchema = require('../models/stock');

const addStock = async (data) => {
    try {
        console.log(data)
        const Stock = new stockSchema({
            name: data.name,
            stocks: data.quantities
        })

        stock.findOne({ name: data.name })
            .then(async function (stock, error) {
                if (stock) {
                    //update the quantity of that size
                } else {
                    await Stock.save().then((stock) => {
                        return ({
                            status: 200,
                            message: "stock added successfully",
                            data: stock
                        })
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                return ({
                    status: 400, message: err, process: 'stock'
                });
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
        console.log("asdasdsa")
        stockSchema.find()
            .then(async stocks => {

                if (stocks) {
                    let columns = [];
                    stocks.forEach(s => {
                        s.type.filter(t => {
                            s[t.size] = t.value
                            !columns.includes(t.size) && columns.push(t.size);
                        })
                    })

                    // let newStocks = await addKey(stocks);

                    columns = columns.sort(function (a, b) {
                        var keyA = (a),
                            keyB = (b);
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });

                    return res.send({ status: 200, columns: columns, data: stocks, totalMessages: stocks.length, process: 'stock1' })
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

// console.log(addKey([
//     {
//         "_id": "647ca211ca387b27b37fee49",
//         "name": "stock 1",
//         "type": [
//             {
//                 "key": "2/6",
//                 "value": 23
//             },
//             {
//                 "key": "4/6",
//                 "value": 10
//             }
//         ],
//         "party": "qwq",
//         "__v": 0
//     }]))

module.exports = { addStock, getStocks }