const validator = require('validator')
const bcrypt = require('bcrypt')
const { pool } = require('../../modules/mysql-init')

/*
findUser()
key = value ORDER BY key [DESC, ASC] LIMIT 0, 10
opt.key = 'idx' => key = value
opt.key = { fields: ['userid', 'id'], op: 'AND' }
opt.value = ['booldook', '2'] => WHERE userid = value1 OR[AND] passwd = value2

pool.execute() => INSERT, UPDATE, DELETE [{ affectedRows... },{ field info }]
pool.execute() => SELECT [[{ id: 1...},{ id: 2...},{ id: 3...}],{ field info }]
*/
const findUser = async (key, value) => {
	let sql
	try {
		sql = ` SELECT * FROM users WHERE ${key} = ? `
		const [r] = await pool.execute(sql, [value])
		return { success: true, user: r[0] }
	}
	catch(err) {
		return { success: false, user: null, err }
	}
}

const findAllUser = async (order = 'ASC') => {
	let sql
	try {
		sql = ` SELECT * FROM users ORDER BY id ? `
		const [users] = await pool.execute(sql, [order])
		return { success: true, users }
	}
	catch(err) {
		return { success: false, users: null, err }
	}
}

const isVerify = async (key, value) => {
	const sql = ` SELECT * FROM users WHERE ${key} = ? `
	const [rs] = await pool.execute(sql, [value])
	return rs.length ? true : false
}

const loginUser = async ({ userid, passwd }) => {
	let sql, compare
	try {
		sql = " SELECT * FROM users WHERE userid=? "
		const [r] = await pool.execute(sql, [userid])
		if(r.length === 1) {
			compare = await bcrypt.compare(passwd + process.env.BCRYPT_SALT, r[0].passwd)
			console.log(compare)
			return compare ? { success: true, user: r[0] } : { success: false, user: null, msg: '비밀번호가 일치하지 않습니다.' }
		}
		else return { success: false, user: null, msg: '아이디가 일치하지 않습니다.' }
	}
	catch(err) {
		return { success: false, user: null, err: err }
	}
}

module.exports = { findUser, findAllUser, isVerify, loginUser }