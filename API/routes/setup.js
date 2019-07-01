const express = require('express')
const router = express.Router()

const setupControllers = require('../controllers/setupControllers')

/* GET home page. */
router.get('/', setupControllers.index)

router.post('/addModel', setupControllers.postAddModel)

router.post('/addSensor', setupControllers.postAddSensor)

module.exports = router