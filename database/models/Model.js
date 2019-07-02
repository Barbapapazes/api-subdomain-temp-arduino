const mongoose = require('mongoose')

let Schema = mongoose.Schema

let modelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Model', modelSchema)