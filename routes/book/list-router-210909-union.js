const path = require('path')
const moment = require('moment')
const express = require('express')
const router = express.Router()
const { error, cutTail, chgStatus, getIcon, relPath } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const createPager = require('../../modules/pager-init')

router.get(['/', '/:page'], async (req, res, next) => {
	let sql, values;
	try {
		console.time('start')
		sql = "SELECT COUNT(idx) FROM books WHERE status < 3"
		const [[cnt]] = await pool.execute(sql)
		const totalRecord = cnt['COUNT(idx)']
		const page = Number(req.params.page || 1)
		const pager = createPager(page, totalRecord, 5, 3)

		sql = `
		(SELECT B.*, F.savename, F.fieldname
		FROM books B LEFT JOIN files F 
		ON B.idx = F.fidx AND F.fieldname = 'C'
		WHERE B.status < 3
		ORDER BY B.idx DESC LIMIT ?, ?)
		UNION
		(SELECT B.*, F.savename, F.fieldname
		FROM books B LEFT JOIN files F 
		ON B.idx = F.fidx AND F.fieldname = 'U'
		WHERE B.status < 3
		ORDER BY B.idx DESC LIMIT ?, ?)
		ORDER BY idx DESC, fieldname ASC`
		let value = [pager.startIdx.toString(), pager.listCnt.toString()]
		values = [...value, ...value]
		const [rs] = await pool.execute(sql, values)
		
		let idx = 0;
		const books = rs.filter((v, i) => {
			v.createdAt = moment(v.createdAt).format('YYYY-MM-DD')
			v.content = cutTail(v.content)
			v.writer = v.writer || '미상'
			v.status = chgStatus(v.status)
			v.cover = v.savename && v.fieldname == 'C' ? relPath(v.savename) : null
			v.icon = v.savename && v.fieldname == 'U' ? getIcon(v.savename) : null
			if(idx === v.idx) {
				rs[i - 1].icon = v.icon
				idx = v.idx
				return false
			}
			else {
				idx = v.idx
				return true
			}
		})
		const title = '도서 목록'
		const description = '등록된 도서들의 리스트 입니다.'
		const js = 'book/list'
		const css = 'book/list'
		console.timeEnd('start')
		res.status(200).render('book/list', { title, description, js, css, books, pager })
	}
	catch(err) {
		next(error(err))
	}
})

module.exports = router