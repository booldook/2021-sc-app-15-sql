const path = require('path')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { error } = require('../../modules/util')
// const {  } = require('../../models/auth')

router.get('/', passport.authenticate('kakao'))

router.get('/cb', passport.authenticate('kakao', {failureRedirect: '/'}), (req, res, next) => {
	res.redirect('/')
})

module.exports = router