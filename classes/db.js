const mongoose = require('mongoose')

function connectDB() {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.localDb,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                retryWrites: false
            })
        console.log('Mongo connected')
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { db } = require('../models/invoice');
// require('dotenv').config()

// const uri = process.env.dbURL

// const client = new MongoClient(uri,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: false,
//             deprecationErrors: true,
//         }
//     });
// async function connectDB() {
//     try {
//         await client.connect();
//         await client.db("innerSpace").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB! ");
//     } finally {
//         await client.close();
//     }
// }

// module.exports = connectDB
