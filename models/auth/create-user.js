const validator = require('validator')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const { pool } = require('../../modules/mysql-init')
const { existUser } = require('./find-user')


const isValid = (user) => {
	let { userid, passwd, passwd2, username, email } = user
	if(!validator.isAlphanumeric(userid) || userid.length < 6 || userid.length > 24) {
		return { msg: '아이디가 형식에 맞지 않습니다.' }
	}
	else if(passwd.length < 6 || passwd.length > 24 || passwd2.length < 6 || passwd2.length > 24 || passwd !== passwd2) {
		return { msg: '패스워드가 형식에 맞지 않습니다.' }
	}
	else if(username.length === 0) {
		return { msg: '이름이 형식에 맞지 않습니다.' }
	}
	else if (!validator.isEmail(email)) {
		return { msg: '이메일이 형식에 맞지 않습니다.' }
	}
	else return true;
}

const createUser = async (user) => {
	let { userid, passwd, username, email, sql, hashPasswd } = user
	let { BCRYPT_SALT: salt, BCRYPT_ROUND: round } = process.env
	try {
		hashPasswd = await bcrypt.hash(passwd + salt, Number(round))
		// 검증
		if(isValid(user) !== true) return { success: false, msg: isValid(user).msg }
		let { success } = await existUser('userid', userid)
		if(success) return { success: false, msg: '아이디가 존재합니다' }
		let { success: success2 } = await existUser('email', email)
		if(success2) return { success: false, msg: '이메일이 존재합니다' }

		sql = " INSERT INTO users SET userid=?, passwd=?, username=?, email=? "
		const [rs] = await pool.execute(sql, [userid, hashPasswd, username, email])
		return rs.affectedRows === 1 ? { success: true } : { success: false, msg: '저장에 실패하였습니다' }
	}
	catch(err) {
		return { success: false, err }
	}
}

const createSnsUser = async ({ userid }, { accessToken, refreshToken, provider, snsid, snsName, displayName, profileURL, email }) => {
	let sql
	try {
		sql = " INSERT INTO users SET userid=? "
		const [{ insertId: idx }] = await pool.execute(sql, [userid])
		sql = ` INSERT INTO users_sns SET fidx=?, accessToken=?, refreshToken=?, provider=?, snsid=?, snsname=?, displayName=?, profileURL=?, email=? `
		await pool.execute(sql, [idx, accessToken, refreshToken, provider, snsid, snsName, displayName, profileURL, email])
		return { success: true, idx }
	}
	catch(err) {
		throw new Error(err)
	}
}

module.exports = { createUser, createSnsUser }