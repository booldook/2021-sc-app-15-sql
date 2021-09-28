const { pool } = require('../../modules/mysql-init')

const findBookCount = async (isStatus = true) => {
	try {
		let sql = (isStatus)
			? " SELECT COUNT(idx) FROM books WHERE status > '0' "
			: " SELECT COUNT(idx) FROM books "
		const [[count]] = await pool.execute(sql)
		return { success: true, count: count['COUNT(idx)'] }
	}
	catch(err) {
		return { success: false, err }
	}
}

const findBook = async idx => {
	try {
		let sql = `
		SELECT B.*, 
		F.oriname, F.savename, F.idx AS id, 
		F2.oriname AS oriname2, F2.savename AS savename2, F2.idx AS id2 
		FROM books B 
		LEFT JOIN files F ON B.idx = F.fidx AND F.fieldname = 'C' AND F.status > '0'
		LEFT JOIN files F2 ON B.idx = F2.fidx AND F2.fieldname = 'U' AND F2.status > '0'
		WHERE B.status > '0' AND B.idx=?`
		const [[book]] = await pool.execute(sql, [idx])
		return { success: false, book }
	}
	catch(err) {
		return { success: false, err }
	}
}

const findBooks = async (startIdx, listCnt) => {
	try {
		let sql = `
		SELECT B.*, F.savename AS cover, F2.savename AS icon 
		FROM books B 
		LEFT JOIN files F ON B.idx = F.fidx AND F.fieldname = 'C' AND F.status > '0'
		LEFT JOIN files F2 ON B.idx = F2.fidx AND F2.fieldname = 'U' AND F2.status > '0'
		WHERE B.status > '0' 
		ORDER BY B.idx DESC
		LIMIT ?, ?`
		const [books] = await pool.execute(sql, [startIdx, listCnt])
		return { success: true, books }
	}
	catch(err) {
		return { success: false, err }
	}
}

module.exports = { findBookCount, findBook, findBooks }