const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-book-mw')


router.post('/', uploader.fields([{name: 'cover'}, {name: 'upfile'}]), async (req, res, next) => {
	let sql, values
	try {
		const { title, writer, content, _method, idx } = req.body
		sql = (_method === 'PUT' && idx) ? 'UPDATE books' : 'INSERT INTO books'
		sql += ' SET title=?, writer=?, content=? '
		sql += (_method === 'PUT' && idx) ? ' WHERE idx='+idx : ''
		values = [title, writer, content]
		const [rs] = await pool.execute(sql, values)
		/*
		if(req.files) { // 첨부파일이 존재함
			for(let [k, [v]] of Object.entries(req.files)) {
				let { originalname, filename, mimetype, size } = v
				sql = (_method === 'PUT' && idx) ? 'UPDATE files ' : 'INSERT INTO files '
				sql += ' oriname=?, savename=?, mimetype=?, size=?, fieldname=? '
				values = [rs.insertId, originalname, filename, mimetype, size, k.substr(0, 1).toUpperCase()]
				await pool.execute(sql, values)
			}
		}
		*/
		res.redirect(`/${req.lang}/book`)
	}
	catch(err) {
		next(error(500, err))
	}
})

router.put('/', (req, res, next) => {
	res.send('받음')
})

module.exports = router