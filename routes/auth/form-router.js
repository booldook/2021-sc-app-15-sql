const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { alert } = require('../../modules/util')
const { createUser } = require('../../models')

router.get('/', (req, res, next) => {
	// join 창 보여주기
	req.app.locals.PAGE = 'JOIN'
	const js = 'auth/form'
	const css = 'auth/form'
	const info = null
	res.status(200).render('auth/form', { js, css, info })
})

router.post('/', async (req, res, next) => {
	// 실제 join 처리
	try {
		const r = await createUser(req.body)
		if(r.success) res.redirect('/')
		else if(r.msg) res.send(alert(msg))
		else next(createError(r.err))
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router