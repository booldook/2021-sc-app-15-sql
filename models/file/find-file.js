const { pool } = require('../../modules/mysql-init')

const findAllFiles = async (order = 'ASC') => {
	try {
		let sql = " SELECT * FROM files ORDER BY idx ? "
		const [files] = await pool.execute(sql, [order])
		return { success: true, files }
	}
	catch(err) {
		return { success: false, err }
	}
}

const findBookFile = async (opt) => {
	try {
		let { fidx, fieldname, status } = opt
		let sql = " SELECT idx, savename FROM files WHERE fidx=? AND fieldname=? AND status=? "
		const [[file]] = await pool.execute(sql, [fidx, fieldname, status])
		return { success: true, file }
	}
	catch(err) {
		return { success: false, err }
	}
}

const findBookFiles = async (idx) => {
	try {
		let sql = " SELECT * FROM files WHERE fidx = ? "
		const [files] = await pool.execute(sql, [idx])
		return { success: true, files }
	}
	catch(err) {
		return { success: false, err }
	}
}

const findFile = async (idx) => {
	try {
		let sql = " SELECT * FROM files WHERE idx = ? "
		const [file] = await pool.execute(sql, [idx])
		return { success: true, file }
	}
	catch(err) {
		return { success: false, err }
	}
}



module.exports = { findFile, findBookFiles, findBookFile, findAllFiles } 