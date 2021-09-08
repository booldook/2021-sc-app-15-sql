const path = require('path')
const moment = require('moment')
const express = require('express')
const router = express.Router()
const { error, cutTail, chgStatus, getIcon } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const createPager = require('../../modules/pager-init')

router.get(['/', '/:page'], async (req, res, next) => {
	let sql, values;
	try {
		sql = "SELECT COUNT(idx) FROM books WHERE status < 3"
		const [[cnt]] = await pool.execute(sql)
		const totalRecord = cnt['COUNT(idx)']
		const page = Number(req.params.page || 1)
		const pager = createPager(page, totalRecord, 5, 3)

		sql = `
		SELECT B.*, F.savename
		FROM books B LEFT JOIN files F 
		ON B.idx = F.fidx 
		WHERE B.status < 3 
		ORDER BY B.idx DESC LIMIT ?, ?`
		values = [pager.startIdx.toString(), pager.listCnt.toString()]
		const [books] = await pool.execute(sql, values)

		books.forEach(v => {
			v.createdAt = moment(v.createdAt).format('YYYY-MM-DD')
			v.content = cutTail(v.content)
			v.writer = v.writer || '미상'
			v.status = chgStatus(v.status)
			v.icon = v.savename ? getIcon(v.savename) : null
		})
		const title = '도서 목록'
		const description = '등록된 도서들의 리스트 입니다.'
		const js = 'book/list'
		const css = 'book/list'
		
		res.status(200).render('book/list', { title, description, js, css, books, pager })
	}
	catch(err) {
		next(error(err))
	}
})

module.exports = router