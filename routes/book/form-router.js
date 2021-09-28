const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { relPath, alert } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const { NO_EXIST } = require('../../modules/lang-init')
const { isUser, isGuest, isMyBook } = require('../../middlewares/auth-mw')
const { findBook } = require('../../models/book')

router.get('/', isUser, (req, res, next) => {
	req.app.locals.PAGE = 'CREATE'
	req.app.locals.js = 'book/form'
	req.app.locals.css = 'book/form'
	req.app.locals.book = null
	res.status(200).render('book/form')
})

router.get('/:idx', isUser, isMyBook('params'), async (req, res, next) => {
	req.app.locals.PAGE = 'UPDATE'
	req.app.locals.js = 'book/form'
	req.app.locals.css = 'book/form'
	try {
		const { book } = await findBook(req.params.idx)
		if(book) {
			console.log(book)
			book.cover = book.ori ? { ori: book.ori, path: relPath(book.name), idx: book.fid } : null
			book.upfile = book.ori2 ? { ori: book.ori2, idx: book.fid2 } : null
			res.status(200).render('book/form', { book })
		}
		else next(createError(400, NO_EXIST))
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router