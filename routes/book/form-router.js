const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	const title = '도서 등록'
	const description = '등록할 도서를 아래에서 입력하세요.'
	const js = 'book/form'
	const css = 'book/form'
	res.status(200).render('book/form', { title, description, js, css })
})

router.get('/:idx', (req, res, next) => {
	const title = '도서 수정'
	const description = '수정할 도서 내용을 아래에서 변경하세요.'
	const js = 'book/form'
	const css = 'book/form'
	res.status(200).render('book/form', { title, description, js, css })
})

module.exports = router