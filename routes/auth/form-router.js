const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/', (req, res, next) => {
	// join 창 보여주기
	req.app.locals.PAGE = 'JOIN'
	const js = 'auth/form'
	const css = 'auth/form'
	const info = null
	res.status(200).render('auth/form', { js, css, info })
})

router.post('/', (req, res, next) => {
	// 실제 join 처리
	res.json(req.body)
})

module.exports = router