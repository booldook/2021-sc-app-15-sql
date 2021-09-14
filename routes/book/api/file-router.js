const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../../modules/util')
const { pool } = require('../../../modules/mysql-init')

router.delete('/', (req, res, next) => {
	req.json(req.params)
})

module.exports = router