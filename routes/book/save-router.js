const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-book-mw')


router.post('/', uploader.fields([{name: 'cover'}, {name: 'upfile'}]), async (req, res, next) => {
	let sql, values
	try {
		const { title, writer, content, _method, idx } = req.body
		const isUpdate = (_method === 'PUT' && idx)
		sql = isUpdate ? " UPDATE books " : " INSERT INTO books "
		sql += " SET title=?, writer=?, content=? "
		sql += isUpdate ? " WHERE idx = " + idx : ""
		values = [title, writer, content]
		const [rs] = await pool.execute(sql, values)
		/*
		1. 위의 Query가 INSERT라면 rs = { insertId: 15, affectedRows: 1 ... }
		2. 위의 Query가 UPDATE라면 rs = { affectedRows: 1 ... }
		3. files QUery는 아래와 같다.
			INSERT INTO files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=?, fidx=?
			- fidx 어디서 ? => rs.insertId
			UPDATE files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=?, status=? WHERE idx=?
			- idx 어디서 ?	=> SELECT * FROM files WHERE fidx = idx
		*/
		/*
		if(req.files) { // 첨부파일이 존재함
			for(let [k, [v]] of Object.entries(req.files)) {
				let { originalname, filename, mimetype, size } = v
				sql = (_method === 'PUT' && idx) ? " UPDATE files " : " INSERT INTO files "
				sql += " SET oriname=?, savename=?, mimetype=?, size=?, fieldname=? "
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