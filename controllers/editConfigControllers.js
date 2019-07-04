const Temperature = require('../database/models/Temperature')
const Sensor = require('../database/models/Sensor')
const Model = require('../database/models/Model')


exports.index = (req, res) => {
    res.render('edit-config', {
        title: 'Edit-Config'
    })
}

exports.module = (req, res) => {
    res.render('model', {
        title: 'Model'
    })
}

exports.sensor = (req, res) => {
    res.render('sensor', {
        title: 'Sensor'
    })
}