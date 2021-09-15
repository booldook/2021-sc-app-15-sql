const express = require('express')
const router = express.Router()
const { error, relPath } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const { NO_EXIST } = require('../../modules/lang-init')

router.get('/', (req, res, next) => {
	req.app.locals.PAGE = 'CREATE'
	const title = '도서 등록'
	const description = '등록할 도서를 아래에서 입력하세요.'
	const js = 'book/form'
	const css = 'book/form'
	const book = null
	res.status(200).render('book/form', { title, description, js, css, book })
})

router.get('/:idx', async (req, res, next) => {
	req.app.locals.PAGE = 'UPDATE'
	try {
		const sql = `
		SELECT B.*, 
		F.oriname AS ori, F.savename AS name, F.fieldname AS field, F.idx AS fid, 
		F2.oriname AS ori2, F2.savename AS name2, F2.fieldname AS field2, F2.idx AS fid2 
		FROM books B 
		LEFT JOIN files F ON B.idx = F.fidx AND F.fieldname = 'C' AND F.status > 0
		LEFT JOIN files F2 ON B.idx = F2.fidx AND F2.fieldname = 'U' AND F2.status > 0
		WHERE B.idx=?`
		const values = [req.params.idx]
		const [[book]] = await pool.execute(sql, values)

		if(book) {
			const js = 'book/form'
			const css = 'book/form'
			book.cover = book.ori ? { ori: book.ori, path: relPath(book.name), idx: book.fid } : null
			book.upfile = book.ori2 ? { ori: book.ori2, idx: book.fid2 } : null
			res.status(200).render('book/form', { css, js, book })
		}
		else  next(error(400, NO_EXIST))
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router