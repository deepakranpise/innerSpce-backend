const productMasterSchema = require('../models/product-master');
const sizeSchema = require('../models/size-master');
const mongoose = require('mongoose')



const addProductMaster = async (req, res) => {
    try {
        console.log(req.body);

        const { size } = await sizeSchema.findOne({ categoryId: new mongoose.Types.ObjectId(req.body.categoryId) }, { size: 1, _id: 0 }).lean();
        console.log(size)
        if (size.length > 0) {
            let bulkSave = [];
            const data = {
                name: req.body.name,
                categoryId: req.body.categoryId,
                subCategoryId: req.body.subCategoryId,
            }
            size.forEach(s => {
                const saveProduct = new productMasterSchema({
                    ...data,
                    size: s
                })
                bulkSave.push(saveProduct);
            });

            // const result = await bulkSave.save()

            const result = await productMasterSchema.bulkSave(bulkSave);

            return res.send(result)
            //    if(result) {

            //    }


        }
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