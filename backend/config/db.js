const mongoose = require("mongoose")

exports.connect = () => {
    try {
        mongoose.set('strictQuery', true)
        mongoose.connect("mongodb+srv://aarti:sYccpVJe19sA2z9M@cluster0.ojrmb85.mongodb.net/mernauthenticationsigma")
        // mongoose.connect(process.env.MONGO_URI)
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}