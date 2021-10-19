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

// GET: field, value를 회원 데이터-한명
const findUser = async (key, value) => {
	let sql
	try {
		sql = ` 
		SELECT 
		U.*, 
		S.idx AS sidx, 
		S.provider, 
		S.snsname, 
		S.displayName, 
		S.email AS snsEmail, 
		S.profileURL, 
		S.status AS snsStatus,
		A.domain,
		A.apikey 
		FROM users AS U 
		LEFT JOIN users_sns AS S
		ON U.idx = S.fidx 
		LEFT JOIN users_api AS A 
		ON U.idx = A.fidx 
		WHERE U.${key} = ? `
		const [r] = await pool.execute(sql, [value])
		if(r.length === 1) {
			r[0].domain = r[0].domain ? r[0].domain.split(',').join('\r\n') : ''
			return { success: true, user: r[0] }
		}
		else 
			return { success: false, user: null }
	}
	catch(err) {
		throw new Error(err)
	}
}

// GET: 모든 회원 데이터
const findAllUser = async (order = 'ASC') => {
	let sql
	try {
		sql = ` SELECT * FROM users ORDER BY id ? `
		const [users] = await pool.execute(sql, [order])
		return { success: true, users }
	}
	catch(err) {
		throw new Error(err)
	}
}

// GET: field, value -> 회원존재여부
// Login (아이디 중복 확인)
const existUser = async (key, value) => {
	try {
		const sql = ` SELECT * FROM users WHERE ${key} = ? `
		const [rs] = await pool.execute(sql, [value])
		return rs.length ? { success: true, idx: rs[0].idx } : { success: false, idx: null }
	}
	catch(err) {
		throw new Error(err)
	}
}

// GET: 로그인 처리
const loginUser = async (userid, passwd) => {
	let sql, compare
	try {
		sql = " SELECT * FROM users WHERE userid=? AND status > '0' "
		const [r] = await pool.execute(sql, [userid])
		if(r.length === 1) {
			compare = await bcrypt.compare(passwd + process.env.BCRYPT_SALT, r[0].passwd)
			return compare 
				? { success: true, user: r[0], msg: '로그인 되었습니다.' } 
				: { success: false, user: null, msg: '비밀번호가 일치하지 않습니다.' }
		}
		else return { success: false, user: null, msg: '아이디가 일치하지 않습니다.' }
	}
	catch(err) {
		throw new Error(err)
	}
}

// 패스워드 확인
const findPasswd = async (key, passwd) => {
	let sql;
	try {
		const field = Number(key) === 'number' ? 'idx' : 'userid'
		sql = ` SELECT passwd FROM users WHERE ${field}=? AND status > '0' `
		const [r] = await pool.execute(sql, [passwd])
		if(r.length === 1) {
			compare = await bcrypt.compare(passwd + process.env.BCRYPT_SALT, r[0].passwd)
			return compare 
				? { success: true } 
				: { success: false }
		}
		else return { success: false }
	}
	catch (err) {
		throw new Error(err)
	}
}

module.exports = { findUser, findAllUser, existUser, loginUser, findPasswd }