const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { relPath, alert } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const { NO_EXIST } = require('../../modules/lang-init')
const { isUser, isGuest, isMyBook } = require('../../middlewares/auth-mw')

router.get('/', isUser, (req, res, next) => {
	req.app.locals.PAGE = 'CREATE'
	req.app.locals.js = 'book/form'
	req.app.locals.css = 'book/form'
	req.app.locals.book = null
	res.status(200).render('book/form')
})

router.get('/:idx', isUser, isMyBook('params'), async (req, res, next) => {
	req.app.locals.PAGE = 'UPDATE'
	req.app.locals.js = 'book/form'
	req.app.locals.css = 'book/form'
	try {
		const sql = `
		SELECT B.*, 
		F.oriname AS ori, F.savename AS name, F.fieldname AS field, F.idx AS fid, 
		F2.oriname AS ori2, F2.savename AS name2, F2.fieldname AS field2, F2.idx AS fid2 
		FROM books B 
		LEFT JOIN files F ON B.idx = F.fidx AND F.fieldname = 'C' AND F.status > '0'
		LEFT JOIN files F2 ON B.idx = F2.fidx AND F2.fieldname = 'U' AND F2.status > '0'
		WHERE B.idx=?`

		const values = [req.params.idx]
		const [[book]] = await pool.execute(sql, values)

		if(book) {
			book.cover = book.ori ? { ori: book.ori, path: relPath(book.name), idx: book.fid } : null
			book.upfile = book.ori2 ? { ori: book.ori2, idx: book.fid2 } : null
			res.status(200).render('book/form', { book })
		}
		else next(createError(400, NO_EXIST))
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router