const express = require('express')
const router = express.Router()

const editConfigControllers = require('../controllers/editConfigControllers')

/* GET home page. */
router.get('/', editConfigControllers.index)

router.get('/sensor', editConfigControllers.sensor)

router.get('/model', editConfigControllers.module)

module.exports = router