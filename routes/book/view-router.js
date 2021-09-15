const express = require('express')
const router = express.Router()
const moment = require('moment')
const { error, chgStatus, relPath, isImg } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const { NO_EXIST } = require('../../modules/lang-init')

router.get('/:idx', async (req, res, next) => {
	req.app.locals.PAGE = 'VIEW'
	let sql, values
	try {
		sql = `
		SELECT B.*, 
		F.oriname, F.savename, F.idx AS id, 
		F2.oriname AS oriname2, F2.savename AS savename2, F2.idx AS id2 
		FROM books B 
		LEFT JOIN files F ON B.idx = F.fidx AND F.fieldname = 'C' AND F.status > '0'
		LEFT JOIN files F2 ON B.idx = F2.fidx AND F2.fieldname = 'U' AND F2.status > '0'
		WHERE B.status > '0' AND B.idx=?`
		values = [req.params.idx]
		const [[book]] = await pool.execute(sql, values)
		if(book) {
			book.createdAt = moment(book.createdAt).format('YYYY-MM-DD HH:mm:ss')
			book.writer = book.writer || '미상'
			book.status = chgStatus(book.status)
			book.cover = book.savename ? relPath(book.savename) : null
			book.upfile = book.savename2 ? relPath(book.savename2) : null
			book.isImg = isImg(book.savename2 || '')

			const css = 'book/view'
			const js = 'book/view'

			res.status(200).render('book/view', { css, js, book })
		}
		else next(error(400, NO_EXIST))
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router