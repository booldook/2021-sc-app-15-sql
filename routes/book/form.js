const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')

router.get('/', (req, res, next) => {
	const title = '도서 등록'
	const file = 'book/form'
	res.status(200).render('book/form', { title, file })
})

module.exports = router