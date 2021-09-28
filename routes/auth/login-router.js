const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const passport = require('passport')
const { alert } = require('../../modules/util')
const { loginUser } = require('../../models/auth')
const { isGuest, isUser } = require('../../middlewares/auth-mw')

router.get('/', isGuest, (req, res, next) => {
	// login 창 보여주기
	req.app.locals.PAGE = 'LOGIN'
	req.app.locals.js = 'auth/login'
	req.app.locals.css = 'auth/login'
	res.render('auth/login')
})

router.post('/', isGuest, async (req, res, next) => {
	const done = (err, user, msg) => {
		if(err) return next(err)
		else if(!user) return res.send(alert(msg))
		else {
			req.logIn(user, err => {
				if(err) return next(err)
				else return res.send(alert('로그인 되었습니다.'))
			})
		}
	}
	passport.authenticate('local', done)(req, res, next)
})

module.exports = router