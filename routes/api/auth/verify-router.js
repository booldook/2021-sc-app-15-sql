const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../../modules/util')
const { mysql, pool } = require('../../../modules/mysql-init')

router.get('/verify', async (req, res, next) => {
	// userid, email 중복 검증
	let sql
	let key = req.query.key
	let value = req.query.value
	try {
		if(value.includes("'") || value.includes('"')) {
			res.status(400).json({ msg: '특수문자가 포함되어 있습니다.' })
		}
		else {
			sql = ` SELECT * FROM users WHERE ${key} = ? `
			const [rs] = await pool.execute(sql, [value])
			res.status(200).json({ isUsed: rs.length ? true : false })
		}
	}
	catch(err) {
		res.status(500).json({ msg: '서버오류 입니다. 다시 시도해 주세요.', err })
	}
})

module.exports = router