const { pool } = require('../../modules/mysql-init')

const isUser = async userid => {
	const sql = " SELECT * FROM users WHERE userid=? "
	const [rs] = await pool.execute(sql, [userid])
	console.log(rs)
	return rs.length ? true : false
}

const isEmail = async email => {
	const sql = " SELECT * FROM users WHERE email=? "
	const [rs] = await pool.execute(sql, [email])
	return rs.length ? true : false
}

module.exports = { isUser, isEmail }