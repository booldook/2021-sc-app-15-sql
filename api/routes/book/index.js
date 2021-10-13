const express = require('express')
const router = express.Router()

const listRouter = require('./list-router')
const viewRouter = require('./view-router')
const downloadRouter = require('./download-router')

router.use('/view', viewRouter)									// HTML/GET: 상세페이지
router.use('/download', downloadRouter)					// HTML/GET: 상세페이지
router.use('/', listRouter)											// HTML/GET: 리스트페이지

module.exports = router
