const mongoose = require('mongoose')

let Schema = mongoose.Schema

let sensorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: Schema.Types.ObjectId,
        ref: 'Model',
        required: true
    }
})

module.exports = mongoose.model('Sensor', sensorSchema)