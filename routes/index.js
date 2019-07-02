const express = require('express')
const router = express.Router()

const indexControllers = require('../controllers/indexControllers')

/* GET home page. */
router.get('/', indexControllers.index)

router.get('/temp', indexControllers.tempOne)

module.exports = router