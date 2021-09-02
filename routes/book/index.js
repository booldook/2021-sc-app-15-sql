const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')

const formRouter = require('./form')
const saveRouter = require('./save')

router.use('/form', formRouter)				// HTML: 글작성페이지
router.use('/save', saveRouter)				// POST: 저장

module.exports = router