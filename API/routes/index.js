const express = require('express')
const router = express.Router()

const apiV1Controllers = require('../controllers/indexControllers')

/* GET home page. */
router.get('/', apiV1Controllers.index)

router.post('/temp/addTemp', apiV1Controllers.postTemp)
router.post('/temp/addSensor', apiV1Controllers.postAddSensor)
router.get('/temp/:id', apiV1Controllers.getTemp)

module.exports = router