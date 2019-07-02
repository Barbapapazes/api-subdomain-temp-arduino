const mongoose = require('mongoose')

let Schema = mongoose.Schema

let temperatureSchema = new Schema({
    idSensor: {
        type: Schema.Types.ObjectId,
        ref: 'Sensor',
        required: true,
        unique: true
    },
    values: [{
        temp: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: new Date()
        }
    }]
})

module.exports = mongoose.model('Temperature', temperatureSchema)