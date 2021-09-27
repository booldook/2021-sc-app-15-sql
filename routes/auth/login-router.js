const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')
const { loginUser } = require('../../models/auth')

router.get('/', (req, res, next) => {
	// login 창 보여주기
	req.app.locals.PAGE = 'LOGIN'
	req.app.locals.js = 'auth/login'
	req.app.locals.css = 'auth/login'
	res.render('auth/login')
})

router.post('/', async (req, res, next) => {
	// 실제 login 로직
	try {
		const r = await loginUser(req.body)
		res.json(r)
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router