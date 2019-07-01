const Datastore = require('nedb')
const database = new Datastore('tempAPI.db')
database.loadDatabase()

exports.index = (req, res, next) => {
    res.send('welcome to the api')
}

exports.postAddSensor = (req, res, next) => {
    const sensor = {...req.body, values: [] }
    database.insert(sensor, (err, data) => {
        if (err) throw err
        res.json(data)
    })
}

exports.postTemp = (req, res, next) => {
    const idSensor = req.body.idSensor
    const temp = req.body.temp
    const date = Date.now()
    let values = []
    const value = {
        temp,
        date
    }
    database.findOne({ idSensor: idSensor }).exec((err, data) => {
        values = data.values
        values.push(value)
        console.log(value, values)
        database.update({ idSensor: idSensor }, { $set: { values: values } }, {}, (err, data) => {
            if (err) throw err
            res.json(data)
        })
    })
}

exports.getTemp = (req, res, next) => {
    const id = req.params.id
    database.findOne({ idSensor: id }, { values: 1, _id: 0 }).sort({ date: 1 }).exec((err, data) => {
        if (err) throw err
        console.log(data.values)
        res.json(data.values)
    })
}