const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.post('/', async (req, res, next) => {
	try {
		const { title, writer, content } = req.body
		const sql = 'INSERT INTO books SET title=?, writer=?, content=?'
		const values = [title, writer, content]
		const [rs] = await pool.execute(sql, values)
		if(rs.affectedRows === 1) res.redirect('/book')
		else next(error(500, '데이터가 저장되지 않았습니다.'))
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router