const mongoose = require('mongoose')

function connectDB() {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect('mongodb://localhost:27017/dheeraj-app') 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB