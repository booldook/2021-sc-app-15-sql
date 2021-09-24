const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const validator = require('validator')
const { pool } = require('../../modules/mysql-init')
const { alert } = require('../../modules/util')
const bcrypt = require('bcrypt')

router.get('/', (req, res, next) => {
	// join 창 보여주기
	req.app.locals.PAGE = 'JOIN'
	const js = 'auth/form'
	const css = 'auth/form'
	const info = null
	res.status(200).render('auth/form', { js, css, info })
})

router.post('/', async (req, res, next) => {
	// 실제 join 처리
	let { userid, passwd, passwd2, username, email, sql, value, hashPasswd } = req.body
	console.log(userid, passwd, passwd2, username, email)
	try {
		hashPasswd = await bcrypt.hash(passwd + process.env.BCRYPT_SALT, Number(process.env.BCRYPT_ROUND))
		// 검증
		if(!validator.isAlphanumeric(userid) || userid.length < 6 || userid.length > 24) {
			res.send(alert('아이디가 형식에 맞지 않습니다.'))
		}
		else if(passwd.length < 6 || passwd.length > 24 || passwd2.length < 6 || passwd2.length > 24 || passwd !== passwd2) {
			res.send(alert('패스워드가 형식에 맞지 않습니다.'))
		}
		else if(username.length === 0) {
			res.send(alert('이름이 형식에 맞지 않습니다.'))
		}
		else if (!validator.isEmail(email)) {
			res.send(alert('이메일이 형식에 맞지 않습니다.'))
		}
		else {
			sql = " SELECT * FROM users WHERE userid=? "
			const [rs] = await pool.execute(sql, [userid])
			if(rs.length) {
				res.send(alert('아이디가 중복되어 있습니다.'))
			}
			else {
				sql = " SELECT * FROM users WHERE email=? "
				const [rs2] = await pool.execute(sql, [email])
				if(rs2.length) {
					res.send(alert('이메일이 중복되어 있습니다.'))
				}
				else {
					sql = " INSERT INTO users SET userid=?, passwd=?, username=?, email=? "
					await pool.execute(sql, [userid, hashPasswd, username, email])
					res.redirect('/')
				}
			}
		}
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router