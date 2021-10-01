const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../../modules/util')
const { mysql, pool } = require('../../../modules/mysql-init')
const { existUser } = require('../../../models/auth')

router.get('/verify', async (req, res, next) => {
	// userid, email 중복 검증
	try {
		const { key, value } = req.query
		const { success: isUsed } = await existUser(key, value)
		res.status(200).json({ isUsed })
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router