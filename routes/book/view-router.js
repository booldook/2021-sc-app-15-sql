const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/:idx', async (req, res, next) => {
	try {
		const sql = "SELECT * FROM books WHERE idx=?"
		const values = [req.params.idx]
		const [[book]] = await pool.execute(sql, values)

		const title = '도서 상세 정보'
		const description = '선택하신 도서의 상세 정보 입니다.'
		const css = 'book/view'
		const js = 'book/view'
		
		if(book) res.status(200).render('book/view', { title, description, css, js, book })
		else next(error(400, "존재하지 않는 데이터 입니다."))
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router