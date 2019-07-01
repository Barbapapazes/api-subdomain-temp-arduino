const express = require('express')
const router = express.Router()

const apiV1Controllers = require('../controllers/indexControllers')

/* GET home page. */
router.get('/', apiV1Controllers.index)


router.get('/temp/:id', apiV1Controllers.getTemp)

module.exports = router