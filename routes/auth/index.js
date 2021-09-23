const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const loginRouter = require('./login-router')
const logoutRouter = require('./logout-router')
const joinRouter = require('./join-router')

router.use('/login', loginRouter)
router.use('/logout', logoutRouter)
router.use('/join', joinRouter)

module.exports = router