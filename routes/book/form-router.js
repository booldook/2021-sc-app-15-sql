const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util-module')

router.get('/', (req, res, next) => {
	const title = '도서 등록'
	const js = 'book/form'
	const css = 'book/form'
	res.status(200).render('book/form', { title, js, css })
})

module.exports = router