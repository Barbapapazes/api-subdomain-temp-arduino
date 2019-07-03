const Temperature = require('../../database/models/Temperature')
const Sensor = require('../../database/models/Sensor')
const Model = require('../../database/models/Model')


exports.index = (req, res) => {
    res.send('Welcome to the temperature !')
}

/////////////////////
//// Temperature ////
/////////////////////

// GET All Temperatures from All Sensors
exports.allTemperaturesAllSensors = (req, res) => {
    console.log(req.body)
    Temperature.find({}, {
        _id: 0,
        idSensor: 1,
        values: 1,
        "values.date": 1,
        "values.temp": 1,
    }).populate({
        path: 'idSensor',
        populate: {
            path: 'model',
            select: 'name -_id'
        },
        select: 'name -_id'
    }).exec((err, results) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(results)
        }
    })
}

// GET All Temperatures from One Sensors
exports.allTemperaturesOneSensor = (req, res) => {
    console.log(req.body)
    Sensor.findOne({ name: req.params.name }).exec((err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result == null)
                res.status(500).send("this sensor doesn't exist")
            else {
                Temperature.findOne({ idSensor: result._id }, {
                    _id: 0,
                    idSensor: 1,
                    values: 1,
                    "values.date": 1,
                    "values.temp": 1,
                }).populate({
                    path: 'idSensor',
                    populate: {
                        path: 'model',
                        select: 'name -_id'
                    },
                    select: 'name -_id'
                }).exec((err, data) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.status(200).json(data)
                    }
                })
            }
        }
    })
}

exports.addTemperature = (req, res) => {
    console.log(req.body)
    res.status(501).send('not implemented, use put')
}

exports.upsertTemperature = (req, res) => {
    console.log(req.body)
    Sensor.findOne({ name: req.body.name }).exec((err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            Temperature.updateOne({ idSensor: result._id }, {
                $push: {
                    values: {
                        temp: req.body.temp,
                        date: new Date()
                    }
                }
            }, {
                upsert: true
            }).exec((err, data) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).send(data)
                }
            })
        }
    })
}

exports.deleteTemperature = (req, res) => {
    console.log(req.body)
    res.status(501).send('not implemented')
}