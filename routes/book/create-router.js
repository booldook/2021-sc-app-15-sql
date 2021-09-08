const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-mw')

router.post('/', uploader.single('cover'), async (req, res, next) => {
	let sql, values
	try {
		const { title, writer, content } = req.body
		sql = 'INSERT INTO books SET title=?, writer=?, content=?'
		values = [title, writer, content]
		const [rs] = await pool.execute(sql, values)

		if(req.file) { // 첨부파일이 존재함
			const { originalname, filename, mimetype, size } = req.file
			sql = 'INSERT INTO files SET fidx=?, oriname=?, savename=?, mimetype=?, size=?'
			values = [rs.insertId, originalname, filename, mimetype, size]
			const [rs2] = await pool.execute(sql, values)
		}
		res.redirect('/book')
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router