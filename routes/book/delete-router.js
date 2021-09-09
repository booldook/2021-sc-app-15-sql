const path = require('path')
const fs = require('fs-extra')
const express = require('express')
const router = express.Router()
const { error, moveFile } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.delete('/', async (req, res, next) => {
	let sql
	try {
		// sql = "DELETE FROM books WHERE idx=?"
		sql = "UPDATE books SET status='3' WHERE idx = " + req.body.idx
		await pool.execute(sql)

		sql = "UPDATE files SET status='0' WHERE fidx = " + req.body.idx
		await pool.execute(sql)

		sql = "SELECT savename FROM files WHERE fidx = " + req.body.idx
		const [rs] = await pool.execute(sql)

		for(let { savename } of rs) {
			await moveFile(savename)
		}
		
		res.redirect('/book')
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router