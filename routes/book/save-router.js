const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util-module')
const { pool } = require('../../modules/mysql-module')

router.get('/', (req, res, next) => {
	res.send('SAVE')
})

module.exports = router