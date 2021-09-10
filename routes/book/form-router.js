const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
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
		LEFT JOIN files F ON B.idx = F.fidx AND F.fieldname = 'C'
		LEFT JOIN files F2 ON B.idx = F2.fidx AND F2.fieldname = 'U'
		WHERE B.idx=?`
		const values = [req.params.idx]
		const [[book]] = await pool.execute(sql, values)

		if(book) {
			const title = '도서 수정'
			const description = '수정할 도서 내용을 아래에서 변경하세요.'
			const js = 'book/form'
			const css = 'book/form'
			res.status(200).render('book/form', { title, description, css, js, book })
		}
		else  next(error(400, NO_EXIST))
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router