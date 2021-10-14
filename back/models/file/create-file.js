const { pool } = require('../../modules/mysql-init')

const createFile = async data => {
	try {
		let sql = " INSERT INTO files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=?, fidx=? "
		let { oriname, savename, mimetype, size, fieldname, fidx } = data
		let values = [oriname, savename, mimetype, size, fieldname, fidx]
		let [rs] = await pool.execute(sql, values)
		return { success: true, idx: rs.insertId }
	}
	catch(err) {
		throw new Error(err)
	}
}

module.exports = { createFile } 