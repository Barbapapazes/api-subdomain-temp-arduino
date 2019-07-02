const Temperature = require('../../database/models/Temperature')
const Sensor = require('../../database/models/Sensor')
const Model = require('../../database/models/Model')


exports.index = (req, res, next) => {
    res.send('Welcome to the api')
}