const bcrypt = require('bcrypt')
const { pool } = require('../../modules/mysql-init')
const { findPasswd } = require('./find-user')

const deleteUser = async (user) => {
	let sql;
	try {
		const { idx, passwd, msg } = user
		const { success } = await findPasswd(idx, passwd)
		if(success) {
			sql = " UPDATE users SET status = '0' WHERE idx=? "
			const [r] = await pool.execute(sql, [idx])
			if(r.affectedRows) {
				sql = " INSERT INTO users_withdrawal SET fidx=?, msg=? "
				const [r2] = await pool.execute(sql, [idx, msg])
				return r2.affectedRows
					? { success: true }
					: { success: false }
			}
			else return { success: false }
		}
		else return { success: false }
  }
  catch (err) {
		throw new Error(err)
  }
}

module.exports = { deleteUser }
