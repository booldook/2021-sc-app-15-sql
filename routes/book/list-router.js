const path = require('path')
const moment = require('moment')
const express = require('express')
const router = express.Router()
const { error, cutTail, chgStatus } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get(['/', '/:page'], async (req, res, next) => {
	try {
		const sql = 'SELECT * FROM books ORDER BY idx DESC';
		const [rs] = await pool.execute(sql)

		const books = rs.map(v => {
			v.createdAt = moment(v.createdAt).format('YYYY-MM-DD')
			v.content = cutTail(v.content)
			v.writer = v.writer || '미상'
			v.status = chgStatus(v.status)
			return v
		})
		const title = '도서 목록'
		const description = '등록된 도서들의 리스트 입니다.'
		const js = 'book/list'
		const css = 'book/list'
		
		res.status(200).render('book/list', { title, description, js, css, books })
	}
	catch(err) {
		next(error(err))
	}
})

module.exports = router