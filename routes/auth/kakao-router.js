const path = require('path')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { error } = require('../../modules/util')
// const {  } = require('../../models/auth')

router.get('/', passport.authenticate('kakao', { failureRedirect: '/' }), (req, res, next) => {
	res.redirect('/')
})

router.get('/cb', (req, res, next) => {

})

module.exports = router