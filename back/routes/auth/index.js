const express = require('express')
const router = express.Router()
const loginRouter = require('./login-router')
const logoutRouter = require('./logout-router')
const kakaoRouter = require('./kakao-router')
const naverRouter = require('./naver-router')
const formRouter = require('./form-router')
const withdrawalRouter = require('./withdrawal-router')

router.use('/login', loginRouter)
router.use('/logout', logoutRouter)
router.use('/withdrawal', withdrawalRouter)
router.use('/kakao', kakaoRouter)
router.use('/naver', naverRouter)
router.use('/form', formRouter)

module.exports = router