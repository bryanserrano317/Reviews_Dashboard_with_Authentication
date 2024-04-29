const uri = "";

const mongoose = require('mongoose')
mongoose.connect(uri)

const db = mongoose.connection
db.on('error', () => console.error(error))
db.once('open', () => console.log('Connected'))

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("users", userSchema)

module.exports = collection

