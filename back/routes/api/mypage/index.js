const express = require('express')
const router = express.Router()
const keyRouter = require('./key-router')

router.use('/key', keyRouter)

module.exports = router