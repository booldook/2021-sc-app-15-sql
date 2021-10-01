const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { alert } = require('../../modules/util')
const { createUser } = require('../../models/auth')
const { isUser, isGuest } = require('../../middlewares/auth-mw')

router.get('/', isGuest, (req, res, next) => {
	// join 창 보여주기
	req.app.locals.PAGE = 'JOIN'
	req.app.locals.js = 'auth/form'
	req.app.locals.css = 'auth/form'
	req.app.locals.info = null
	res.status(200).render('auth/form')
})

router.post('/', async (req, res, next) => {
	// 실제 join 처리
	try {
		const r = await createUser(req.body)
		if(r) res.redirect('/')
		else res.send(alert(ERROR.SQL_ERROR))
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router