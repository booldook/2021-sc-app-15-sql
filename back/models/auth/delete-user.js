const bcrypt = require('bcrypt')
const { pool } = require('../../modules/mysql-init')
const { existUser } = require('./find-user')
const isValid = require('./is-valid')

const deleteUser = async (user) => {
	let sql;
	try {
		const { idx, passwd, msg } = user
		sql = " SELECT passwd FROM users WHERE idx=? AND status > 0 "
		const [r] = await pool.execute(sql, [idx])
		if(r.length === 1) {
			compare = await bcrypt.compare(passwd + process.env.BCRYPT_SALT, r[0].passwd)
			if(compare) {
				sql = " UPDATE users "
				sql = " INSERT INTO users_withdrawal "
			}
		}
  }
  catch (err) {

  }
}

module.exports = { deleteUser }
