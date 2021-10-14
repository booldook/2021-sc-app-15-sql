const path = require('path')
const moment = require('moment')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { cutTail, chgStatus, getIcon, relPath } = require('../../modules/util')
const createPager = require('../../modules/pager-init')
const { findBookCount, findBooks } = require('../../models/auth')
const { isApiUser } = require('../../middlewares/jwt-mw')

router.get(['/', '/:page'], isApiUser, async (req, res, next) => {
	try {
		const { count: totalRecord } = await findBookCount()
		const page = Number(req.params.page || 1)
		const pager = createPager(page, totalRecord, 5, 3)
		const { books } = await findBooks(pager.startIdx.toString(), pager.listCnt.toString())
		books.forEach(v => {
			v.createdAt = moment(v.createdAt).format('YYYY-MM-DD')
			v.content = cutTail(v.content)
			v.writer = v.writer || '미상'
			v.status = chgStatus(v.status)
			v.cover = v.cover ? relPath(v.cover) : null
			v.icon = v.icon ? getIcon(v.icon) : null
		})
		res.status(200).json({ books, pager })
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router