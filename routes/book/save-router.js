const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util-module')
const { pool } = require('../../modules/mysql-module')

router.post('/', async (req, res, next) => {
	try {
		const { title, writer, content } = req.body
		const sql = 'INSERT INTO books SET title=?, writer=?, content=?'
		const values = [title, writer, content]
		const rs = await pool.execute(sql, values)
		res.status(200).json(rs)
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router