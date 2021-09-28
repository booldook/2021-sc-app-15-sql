/*
* fields : [['fieldname', 'value'],[],[]]
*/

const { pool } = require('../../modules/mysql-init')

const updateFile = async (idx, fields) => {
	try {
		let sql = " UPDATE files SET "
		for(v of fields) sql += `${v[0]}='${v[1]}',`
		sql = sql.substr(0, sql.length - 1)
		sql += " WHERE idx=? "
		const [rs] = await pool.execute(sql, [idx])
		return rs.affectedRows > 0 
			? { success: true, idx } 
			: { success: false, idx, msg: 'Error' }
	}
	catch(err) {
		return { success: false, err }
	}
}

module.exports = { updateFile } 