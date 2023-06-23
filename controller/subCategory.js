const subCategorySchema = require('../models/subCategory-master');


const addSubCategory = async (req, res) => {
    try {

        const subCategory = new subCategorySchema({
            name: req.body.name,
            categoryId: req.body.categoryId
        })

        await subCategory.save()
            .then(result => {
                res.send({ status: 200, data: result, process: "category" })
            })
            .catch(err => {
                res.send({ status: 400, data: err, process: "category" })
                console.log(err)

            })


    }
    catch (err) {
        console.log(err)
        return res.send({
            status: 400, message: err, process: 'category'
        });
    }
}

const getSubCategories = async (req, res) => {
    try {
        subCategorySchema.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'categoryId'
                }
            }
        ])
            .then(async category => {
                if (category) {
                    return res.send({ status: 200, data: category, process: 'subCategorySchema' })
                } else {
                    return res.send({ status: 200, data: category, message: 'subCategorySchema does not exist', process: 'subCategorySchema' })
                }
            })
            .catch(err => {
                console.log(err)
                return res.send({ status: 400, message: err, process: 'subCategorySchema' })
            })
    }
    catch (err) {
        console.log(err)
        return res.send({
            status: 400, message: err, process: 'subCategorySchema'
        });
    }
}

module.exports = { addSubCategory, getSubCategories }

