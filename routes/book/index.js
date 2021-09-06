const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')

const formRouter = require('./form-router')
const saveRouter = require('./save-router')
const listRouter = require('./list-router')
const viewRouter = require('./view-router')
const deleteRouter = require('./delete-router')

router.post('/', saveRouter)			// POST: 저장
router.delete('/', viewRouter)		// DELETE: 삭제
router.use('/form', formRouter)		// HTML: 글작성페이지
router.get('/', listRouter)				// HTML/GET: 리스트페이지
router.get('/:idx', viewRouter)		// HTML/GET: 상세페이지

module.exports = router

/* 
GET  		/book							전체리스트 LIST
GET  		/book?page=1			페이지리스트 LIST
GET  		/book/1						상세리스트 VIEW
POST 		/book							저장 save
PUT  		/book							업데이트 update
DELETE 	/book							삭제 delete
*/