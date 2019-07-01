const Temperature = require('../database/models/Temperature')
const Sensor = require('../database/models/Sensor')
const Model = require('../database/models/Model')


exports.index = (req, res) => {
    res.send('Welcome to the temperature !')
}

exports.postAddTemp = (req, res) => {
    console.log(req.body)
    res.send('Welcome to the addTemp !')
}