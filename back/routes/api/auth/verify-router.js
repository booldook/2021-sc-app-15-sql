const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../../modules/util')
const { mysql, pool } = require('../../../modules/mysql-init')
const { existUser } = require('../../../models/auth')

router.get('/verify', async (req, res, next) => {
	// userid, email 중복 검증
	try {
		let { key, value, isUsed } = req.query
		if(req.user && key === 'email' && req.user.email === value) {
			isUsed = false;
		}
		else {
			const { success } = await existUser(key, value)
			isUsed = success;
		}
		res.status(200).json({ isUsed })
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router