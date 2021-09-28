const { pool } = require('../../modules/mysql-init')

const createFile = async data => {
	console.log(data)
	try {
		let sql = " INSERT INTO files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=?, fidx=? "
		let { oriname, savename, mimetype, size, fieldname, fidx } = data
		let values = [oriname, savename, mimetype, size, fieldname, fidx]
		let [rs] = await pool.execute(sql, values)
		return { success: true, idx: rs.insertId }
	}
	catch(err) {
		return { success: false, err }
	}
}

module.exports = { createFile } 