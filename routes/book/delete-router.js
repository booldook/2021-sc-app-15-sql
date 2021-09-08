const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.delete('/', async (req, res, next) => {
	try {
		// const sql = "DELETE FROM books WHERE idx=?"
		const sql = "UPDATE books SET status='3' WHERE idx=?"
		const values = [req.body.idx]
		const [rs] = await pool.execute(sql, values)
		res.redirect('/book')
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router