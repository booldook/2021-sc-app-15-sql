const bcrypt = require('bcrypt')
const { pool } = require('../../modules/mysql-init')
const { existUser, findUser } = require('./find-user')
const isValid = require('./is-valid')

const updateUser = async ({ idx, passwd, username, email, sql, values }) => {
	try {
		let { BCRYPT_SALT: salt, BCRYPT_ROUND: round } = process.env
		let { user } = await findUser('idx', idx)
		if(!username || !email || user.status < 3) {
			throw new Error('ERROR')
		}
		else if(user.status < 5) {
			sql = " UPDATE users SET username=?, email=? WHERE idx=?"
			values = [username, email, idx]
		}
		else {
			let hashPasswd = await bcrypt.hash(passwd + salt, Number(round))
			sql = " UPDATE users SET passwd=?, username=?, email=? WHERE idx=?"
			values = [hashPasswd, username, email, idx]
		}
		let [rs] = await pool.execute(sql, values)
		return rs.affectedRows === 1
	}
	catch(err) {
		throw new Error(err)
	}
}

/* 
obj = { 필드명: 값, 필드명2: 값 ... }
keys = { 키: 값 } 기준
*/
const changeUser = async (obj, key, tblName = 'users') => {
	sql  = ` UPDATE ${tblName} SET `
	for(let v of Object.entries(obj)) sql += ` ${v[0]}='${v[1]}',`
	sql = sql.substr(0, sql.length - 1)
	sql += ` WHERE ${Object.keys(key)[0]}=? `
	const [r] = await pool.execute(sql, [Object.values(key)[0]])
	return (r.affectedRows)
		? { success: true }
		: { success: false }
}

module.exports = { updateUser, changeUser }
