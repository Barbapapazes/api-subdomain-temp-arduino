const express = require('express')
const router = express.Router()

const temperatureControllers = require('../controllers/temperatureControllers')

/* GET home page. */
router.get('/', temperatureControllers.index)

router.get('/all', temperatureControllers.allTemperaturesAllSensors)

/** Handle CRUD Temperature */
router.get('/one/:name', temperatureControllers.allTemperaturesOneSensor)
    .post('/', temperatureControllers.addTemperature)
    .put('/', temperatureControllers.upsertTemperature)
    .delete('/', temperatureControllers.deleteTemperature)



module.exports = router