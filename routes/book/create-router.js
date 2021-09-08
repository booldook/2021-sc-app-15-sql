const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-book-mw')

router.post('/', uploader.fields([{name: 'cover'}, {name: 'upfile'}]), async (req, res, next) => {
	let sql, values
	try {
		const { title, writer, content } = req.body
		sql = 'INSERT INTO books SET title=?, writer=?, content=?'
		values = [title, writer, content]
		const [rs] = await pool.execute(sql, values)

		if(req.files) { // 첨부파일이 존재함
			for(let [k, [v]] of Object.entries(req.files)) {
				let { originalname, filename, mimetype, size } = v
				sql = 'INSERT INTO files SET fidx=?, oriname=?, savename=?, mimetype=?, size=?, fieldname=?'
				values = [rs.insertId, originalname, filename, mimetype, size, k.substr(0, 1).toUpperCase()]
				await pool.execute(sql, values)
			}
		}
		res.redirect('/book')
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router