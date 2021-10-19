const bcrypt = require('bcrypt')
const { pool } = require('../../modules/mysql-init')
const { findPasswd } = require('./find-user')

const deleteUser = async (user) => {
	let sql;
	try {
		const { idx, passwd, msg } = user
		if(await findPasswd(idx, passwd)) {
			sql = " UPDATE users SET status = '0' WHERE idx=? "
			await pool.execute(sql, [idx])
			sql = " INSERT INTO users_withdrawal SET fidx=?, msg=? "
			await pool.execute(sql, [idx, msg])
			return { success: true }
		}
		else return { success: false }
  }
  catch (err) {
		throw new Error(err)
  }
}

module.exports = { deleteUser }
