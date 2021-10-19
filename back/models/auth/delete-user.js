const bcrypt = require('bcrypt')
const { pool } = require('../../modules/mysql-init')
const { findPasswd } = require('./find-user')

const deleteUser = async (user) => {
	let sql;
	try {
		const { idx, passwd, msg, status } = user

		if(status === 3) {	// SNS 회원 처리
			sql = " UPDATE users SET status = '0' WHERE idx=? "
			const [r] = await pool.execute(sql, [idx])
			if(r.affectedRows) {
				sql = " UPDATE users_sns SET status = '0' WHERE fidx=? "
				const [r2] = await pool.execute(sql, [idx])
			}
			else return { success: false }
		}
		else {	// 일반 회원 처리
			const { success } = await findPasswd(idx, passwd)
			if(success) {
				sql = " UPDATE users SET status = '0' WHERE idx=? "
				const [r2] = await pool.execute(sql, [idx])
			}
			else return { success: false }
		}

		if(r2.affectedRows) {
			sql = " INSERT INTO users_withdrawal SET fidx=?, msg=? "
			const [r3] = await pool.execute(sql, [idx, msg])
			return r3.affectedRows
				? { success: true }
				: { success: false }
		}
		else return { success: false }
  }
  catch (err) {
		throw new Error(err)
  }
}

module.exports = { deleteUser }
