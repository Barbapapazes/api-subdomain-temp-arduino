const express = require('express')
const router = express.Router()

const setupControllers = require('../controllers/setupControllers')

/* GET home page. */
router.get('/', setupControllers.index)

/** Handle CRUD Model */
router
    .get('/model', setupControllers.model)
    .post('/model', setupControllers.addModel)
    .put('/model/:name', setupControllers.updateModel)
    .delete('/model/:name', setupControllers.deleteModel)

/** Handle CRUD Sensor */
router.get('/sensor', setupControllers.sensor)
    .post('/sensor', setupControllers.addSensor)
    .put('/sensor/:name', setupControllers.updateSensor)
    .delete('/sensor/:name', setupControllers.deleteSensor)

module.exports = router