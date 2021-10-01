const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { relPath, alert } = require('../../modules/util')
const { findBook } = require('../../models/book')
const { NO_EXIST } = require('../../modules/lang-init')
const { isUser, isGuest, isMyBook } = require('../../middlewares/auth-mw')

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
			book.cover = book.oriname 
				? { ori: book.oriname, path: relPath(book.savename), idx: book.id } 
				: null
			book.upfile = book.oriname2 
				? { ori: book.oriname2, idx: book.id2 } 
				: null
			res.status(200).render('book/form', { book })
		}
		else next(createError(400, NO_EXIST))
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router