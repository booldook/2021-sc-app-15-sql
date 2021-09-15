const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')

const formRouter = require('./form-router')
const listRouter = require('./list-router')
const viewRouter = require('./view-router')
const downloadRouter = require('./download-router')
const saveRouter = require('./save-router')
const deleteRouter = require('./delete-router')

router.post('/', saveRouter)										// FORM/POST: 저장, 수정
router.delete('/', deleteRouter)								// FORM/DELETE: 삭제
router.use('/form', formRouter)									// HTML: 글작성(수정)페이지
router.use('/view', viewRouter)									// HTML/GET: 상세페이지
router.use('/download', downloadRouter)					// HTML/GET: 상세페이지
router.use('/', listRouter)											// HTML/GET: 리스트페이지

module.exports = router

/* 
POST 		/book								저장 save
PUT  		/book								업데이트 update
DELETE 	/book								삭제 delete
GET  		/book/form					신규 CREATE
GET  		/book/form/1				수정 UPDATE
GET  		/book/view/1				상세리스트 VIEW
GET  		/book/download/1		파일 다운로드
GET  		/book, /book/:page	페이지리스트 LIST - page
*/