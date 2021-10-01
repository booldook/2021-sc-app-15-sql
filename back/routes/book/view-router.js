const express = require('express')
const router = express.Router()
const moment = require('moment')
const createError = require('http-errors')
const { chgStatus, relPath, isImg } = require('../../modules/util')
const { findBook } = require('../../models/book')
const { NO_EXIST } = require('../../modules/lang-init')
const { isMyBook } = require('../../middlewares/auth-mw')

router.get('/:idx', async (req, res, next) => {
	req.app.locals.PAGE = 'VIEW'
	req.app.locals.css = 'book/view'
	req.app.locals.js = 'book/view'
	try {
		const { book } = await findBook(req.params.idx)
		if(book) {
			book.createdAt = moment(book.createdAt).format('YYYY-MM-DD HH:mm:ss')
			book.writer = book.writer || '미상'
			book.status = chgStatus(book.status)
			book.cover = book.savename ? relPath(book.savename) : null
			book.upfile = book.savename2 ? relPath(book.savename2) : null
			book.isImg = isImg(book.savename2 || '')
			res.status(200).render('book/view', { book })
		}
		else next(createError(400, NO_EXIST))
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router