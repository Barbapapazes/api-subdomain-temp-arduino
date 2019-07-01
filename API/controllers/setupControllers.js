const Temperature = require('../database/models/Temperature')
const Sensor = require('../database/models/Sensor')
const Model = require('../database/models/Model')


exports.index = (req, res) => {
    res.send('Welcome to the setup !')
}

exports.postAddModel = (req, res) => {
    console.log(req.body)
    Model.create({
        ...req.body
    }, (err, model) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(`Done! ${model}`)
        }
    })
}

exports.postAddSensor = (req, res) => {
    console.log(req.body)
    Sensor.create({
        ...req.body
    }, (err, sensor) => {
        if (err) {
            res.status(500).send(err)
        } else {
            Temperature.create({
                idSensor: sensor._id
            }, (err, temperature) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).send(`Done! ${sensor}, ${temperature}`)
                }
            })
        }
    })
}