const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const loginRouter = require('./login-router')
const logoutRouter = require('./logout-router')
const kakaoRouter = require('./kakao-router')
const naverRouter = require('./naver-router')
const formRouter = require('./form-router')

router.use('/login', loginRouter)
router.use('/logout', logoutRouter)
router.use('/kakao', kakaoRouter)
router.use('/naver', naverRouter)
router.use('/form', formRouter)

module.exports = router