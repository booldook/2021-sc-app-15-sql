const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')

const formRouter = require('./form-router')
const saveRouter = require('./save-router')
const listRouter = require('./list-router')

router.use('/form', formRouter)				// HTML: 글작성페이지
router.use('/save', saveRouter)				// POST: 저장
router.use('/list', listRouter)				// HTML/GET: 리스트페이지

module.exports = router