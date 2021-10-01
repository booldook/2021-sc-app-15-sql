const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../../modules/util')
const { pool } = require('../../../modules/mysql-init')
const verifyRouter = require('./verify-router')

router.use('/', verifyRouter)

module.exports = router