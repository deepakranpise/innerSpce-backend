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
                code:req.body.code,
                categoryId: req.body.categoryId,
                subCategoryId: req.body.subCategoryId
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

            return res.send({status:200, message:result, process:'product'})
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
        // productMasterSchema.aggregate([
        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: "categoryId",
        //             foreignField: "_id",
        //             as: "category"
        //         }
        //     }, {
        //         $unwind: {
        //             path: "$category",
        //             preserveNullAndEmptyArrays: true
        //         }
        //     }, {
        //         $project: {
        //             "ProductName": "$product.name",
        //             "_id": 1,
        //             "productId": 1,
        //             "quantity": 1,
        //             "size": "$product.size"
        //         }
        //     }
        // ])


        productMasterSchema.find().populate([{ path: 'categoryId', model: 'Category', select: { name: 1, _id: 1 } }, { path: 'subCategoryId', model: 'SubCategory', select: { name: 1, _id: 1 } }])
            .then(async products => {

                let unique = products;
                if (req.query.distinct) {
                    unique = [];
                    products.forEach(p => {
                        let a = unique.filter(u => u.name === p.name);
                        if (a.length === 0) {
                            unique.push(p);
                        }
                    })
                }
                if (products) {
                    return res.send({ status: 200, data: unique, totalMessages: products.length, process: 'products' })
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