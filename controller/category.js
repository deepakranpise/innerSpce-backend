const categorySchema = require('../models/category-master');


const addCategory = async (req, res) => {
    try {

        const category = new categorySchema({
            name: req.body.name
        })

        await category.save()
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

const getCategories = async (req, res) => {
    try {
        categorySchema.find()
            .then(async category => {
                console.log(category)
                if (category) {
                    return res.send({ status: 200, data: category, process: 'category' })
                } else {
                    return res.send({ status: 200, data: category, message: 'category does not exist', process: 'category' })
                }
            })
            .catch(err => {
                console.log(err)
                return res.send({ status: 400, message: err, process: 'category' })
            })
    }
    catch (err) {
        console.log(err)
        return res.send({
            status: 400, message: err, process: 'category'
        });
    }
}

module.exports = { addCategory, getCategories }

