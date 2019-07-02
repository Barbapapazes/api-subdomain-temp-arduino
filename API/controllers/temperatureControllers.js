const Temperature = require('../../database/models/Temperature')
const Sensor = require('../../database/models/Sensor')
const Model = require('../../database/models/Model')


exports.index = (req, res) => {
    res.send('Welcome to the temperature !')
}

exports.postAddTemp = (req, res) => {
    console.log(req.body)
    Temperature.updateOne({ idSensor: req.body.idSensor }, {
        $push: {
            values: {
                temp: req.body.temp
            }
        }
    }).exec((err, temperature) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(`Done! ${temperature}`)
        }
    })
}

exports.getSensorTemp = (req, res) => {
    console.log(req.params.id)
    Temperature.findOne({ idSensor: req.params.id }).exec((err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(result.values)
        }
    })
}