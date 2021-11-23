const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('connected to database successfully')
    } catch (error) {
        console.log('database connection failed .... Error: ' + error)
    }

}
module.exports = connectDB;