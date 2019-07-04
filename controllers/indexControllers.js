const Temperature = require('../database/models/Temperature')
const Sensor = require('../database/models/Sensor')
const Model = require('../database/models/Model')

exports.index = (req, res, next) => {
    Sensor.find({}).populate('model').exec((err, results) => {
        console.log(results)
        if (err) {
            res.status(500).send(err)
        } else {
            res.render('index', { title: 'Sensors', sensors: results })
        }
    })
}

exports.tempOne = (req, res, next) => {

    res.render('tempOne', {
        title: 'Graph',

    })
}