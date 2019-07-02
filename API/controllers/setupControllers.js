const Temperature = require('../../database/models/Temperature')
const Sensor = require('../../database/models/Sensor')
const Model = require('../../database/models/Model')


exports.index = (req, res) => {
    res.send('Welcome to the setup !')
}

///////////////
//// MODEL ////
/////////////// 

// GET All Models
exports.model = (req, res) => {
    console.log(req.body)
    Model.find({}, { _id: 0, name: 1 }).exec((err, results) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(results)
        }
    })
}

// POST a new Model
exports.addModel = (req, res) => {
    console.log(req.body)
    Model.create({
        ...req.body
    }, (err, model) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(model)
        }
    })
}

// PUT a existing Model
exports.updateModel = (req, res) => {
    console.log(req.body)
    Model.findOneAndUpdate({ name: req.params.name }, {
        $set: {
            name: req.body.name
        }
    }).exec((err, model) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(model)
        }
    })
}

// DELETE a Model
exports.deleteModel = (req, res) => {
    console.log(req.body)
    Model.findOneAndDelete({ name: req.params.name }).exec((err, model) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(model)
        }
    })
}

////////////////
//// Sensor ////
////////////////

// GET All Sensors
exports.sensor = (req, res) => {
    console.log(req.body)
    Sensor.find({}, { _id: 0, name: 1 }).populate({
        path: 'model',
        select: 'name -_id'
    }).exec((err, results) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(results)
        }
    })
}

// POST a new Sensor
exports.addSensor = (req, res) => {
    console.log(req.body)
    Model.findOne({ name: req.body.model }).exec((err, result) => {
        Sensor.create({
            name: req.body.name,
            model: result._id
        }, (err, sensor) => {
            if (err) {
                res.status(500).send(err)
            } else {
                /*Temperature.create({
                    idSensor: sensor._id
                }, (err, temperature) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.status(200).send(`Done! ${sensor}, ${temperature}`)
                    }
                })*/
                res.status(200).json(sensor)
            }
        })
    })
}

// PUT a existing Sensor
exports.updateSensor = (req, res) => {
    console.log(req.body)
    Model.findOne({ name: req.body.model }).exec((err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            Sensor.findOneAndUpdate({ name: req.params.name }, {
                $set: {
                    name: req.body.name,
                    model: result._id
                }
            }).exec((err, model) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).json(model)
                }
            })
        }
    })

}

// DELETE a Sensor
exports.deleteSensor = (req, res) => {
    console.log(req.body)
    Sensor.findOneAndDelete({ name: req.params.name }).exec((err, model) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(model)
        }
    })
}