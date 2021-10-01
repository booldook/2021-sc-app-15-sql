const { pool } = require('../../modules/mysql-init')

const updateBook = async book => {
	try {
		let { title, writer, content, idx } = book
		let sql = " UPDATE books SET title=?, writer=?, content=? WHERE idx = ? "
		const [rs] = await pool.execute(sql, [title, writer, content, idx])
		return rs.affectedRows > 0 
			? { success: true, idx } 
			: { success: false, idx, msg: 'Error' }
	}
	catch(err) {
		return { success: false, err }
	}
}

const updateBookStatus = async (idx, status = 0) => {
	try {
		let sql = " UPDATE books SET status=? WHERE idx=? "
		const [rs] = await pool.execute(sql, [String(status), String(idx)])
		return rs.affectedRows > 0 
			? { success: true, idx } 
			: { success: false, idx, msg: 'Error' }
	}
	catch(err) {
		return { success: false, err }
	}
}

module.exports = { updateBook, updateBookStatus } 