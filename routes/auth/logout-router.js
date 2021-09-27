const path = require('path')
const express = require('express')
const router = express.Router()
const { alert } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

router.get('/', (req, res, next) => {
	req.session.destroy()
	res.locals.user = null
	res.send(alert('로그아웃 되었습니다.'))
})

module.exports = router