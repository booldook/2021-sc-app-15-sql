const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const { findUser } = require('../../models/auth')

router.get('/', async (req, res, next) => {
	// login 창 보여주기
	await findUser('id', 1)
	res.send('error')
})

router.post('/', (req, res, next) => {
	// 실제 login 로직
})

module.exports = router