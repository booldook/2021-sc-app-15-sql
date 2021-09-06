const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/', (req, res, next) => {
	const title = '도서 등록'
	const description = '등록할 도서를 아래에서 입력하세요.'
	const js = 'book/form'
	const css = 'book/form'
	const book = null
	res.status(200).render('book/form', { title, description, js, css, book })
})

router.get('/:idx', async (req, res, next) => {
	try {
		const sql = 'SELECT * FROM books WHERE idx=?'
		const values = [req.params.idx]
		const [[book]] = await pool.execute(sql, values)

		const title = '도서 수정'
		const description = '수정할 도서 내용을 아래에서 변경하세요.'
		const js = 'book/form'
		const css = 'book/form'
		res.status(200).render('book/form', { title, description, css, js, book })
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router