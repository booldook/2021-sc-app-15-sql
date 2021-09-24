const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../../modules/util')
const { pool } = require('../../../modules/mysql-init')

router.get('/verify', async (req, res, next) => {
	// userid, email 중복 검증
	let sql
	let key = req.query.key
	let value = req.query.value
	
	try {
		if(value.includes("'") || value.includes('"')) {
			res.status(401).json({ error: '특수문자가 포함되어 있습니다.' })
		}
		else {
			sql = ` SELECT ${key} FROM users WHERE ${key}=? `
			console.log(sql)
			const [rs] = await pool.execute(sql, [value])
			console.log(rs)
			res.status(200).json({ isUsed: rs.length ? true : false })
		}
	}
	catch(err) {
		res.status(500).json(err)
	}
})

module.exports = router