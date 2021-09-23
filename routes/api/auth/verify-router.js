const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../../modules/util')
const { pool } = require('../../../modules/mysql-init')

router.get('/userid', (req, res, next) => {
	// userid 중복 검증
})

router.get('/email', (req, res, next) => {
	// email 중복 검증
})

module.exports = router