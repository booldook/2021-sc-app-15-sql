const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const { findUser } = require('../../models/auth')

router.get('/', (req, res, next) => {
	// login 창 보여주기
	req.app.locals.PAGE = 'LOGIN'
	const js = 'auth/login'
	const css = 'auth/login'
	res.render('auth/login')
})

router.post('/', (req, res, next) => {
	// 실제 login 로직
})

module.exports = router