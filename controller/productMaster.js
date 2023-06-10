const productMasterSchema = require('../models/product-master');

const addProductMaster = async (req, res) => {
    try {
        console.log(req.body)
        const Product = new productMasterSchema({
            category: req.body.category,
            subCategory: req.body.subCategory,
            products: req.body.products
        })
        await Product.save().then((product) => {
            return res.send({
                status: 200,
                message: "product added successfully",
                data: product
            })
        })
            .catch((err) => {
                console.log(err)
                return res.send({
                    status: 400, message: err, process: 'product'
                });
            })
    }
    catch (err) {
        console.log(err)
        return res.send({
            status: 400, message: err, process: 'product'
        });
    }
}

const getProductMaster = async (req, res) => {
    try {
        console.log("asdasdsa")
        productMasterSchema.find()
            .then(async products => {

                if (products) {
                    return res.send({ status: 200, data: products, totalMessages: products.length, process: 'products' })
                } else {
                    return res.send({ status: 200, data: products, message: 'products does not exist', process: 'products' })
                }
            })
            .catch(err => {
                console.log(err)
                return res.send({ status: 400, message: err, process: 'products' })
            })
    }
    catch (err) {
        console.log(err)
        return res.send({
            status: 400, message: err, process: 'products'
        });
    }
}


module.exports = { addProductMaster, getProductMaster }