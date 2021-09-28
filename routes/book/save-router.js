


const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { moveFile } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-book-mw')
const { isUser, isGuest, isMyBook } = require('../../middlewares/auth-mw')


router.post('/', isUser, uploader.fields([{name: 'cover'}, {name: 'upfile'}]), isMyBook('body', 'U'), async (req, res, next) => {
	try {
		let book = { ...req.body, fidx: req.session.user.idx }
		const r = (book._method === 'PUT' && book.idx) 
			? await createBook(book) 
			: await updateBook(book)
		
		if(req.files) {
			let fieldname;
			for(let [k, [v]] of Object.entries(req.files)) {
				fieldname = k.substr(0, 1).toUpperCase()
				if(isUpdate) {
					sql = " SELECT idx, savename FROM files WHERE fidx=? AND fieldname=? AND status=? "
					values = [idx, fieldname, '1']
					let [rsf] = await pool.execute(sql, values)
					if(rsf.length > 0) {
						sql = " UPDATE files SET status = '0' WHERE idx= " + rsf[0].idx
						await pool.execute(sql)
						await moveFile(rsf[0].savename)
					}
				}
				sql = " INSERT INTO files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=?, fidx=? "
				values = [v.originalname, v.filename, v.mimetype, v.size, fieldname, (isUpdate ? idx : rs.insertId)]
				await pool.execute(sql, values)
			}
			res.redirect(`/${req.lang}/book`)
		}
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router