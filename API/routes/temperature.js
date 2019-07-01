const express = require('express')
const router = express.Router()

const temperatureControllers = require('../controllers/temperatureControllers')

/* GET home page. */
router.get('/', temperatureControllers.index)

router.post('/addTemp', temperatureControllers.postAddTemp)

module.exports = router