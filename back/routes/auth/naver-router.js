const path = require('path')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { error, alert } = require('../../modules/util')

router.get('/', passport.authenticate('naver'))

router.get('/cb', passport.authenticate('naver', {failureRedirect: '/'}), (req, res, next) => {
	res.send(alert('로그인 되었습니다.'))
})

module.exports = router