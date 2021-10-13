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

const updateFileStatus = async (fidx, status = 0) => {
	try {
		let sql = " UPDATE files SET status=? WHERE fidx=? "
		const [rs] = await pool.execute(sql, [String(status), String(fidx)])
		return rs.affectedRows > 0 
			? { success: true, fidx } 
			: { success: false, fidx, msg: 'Error' }
	}
	catch(err) {
		return { success: false, err }
	}
}

module.exports = { updateFile, updateFileStatus } 