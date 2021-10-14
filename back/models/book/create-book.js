/*
1. 위의 Query가 INSERT라면 rs = { insertId: 15, affectedRows: 1 ... }
2. 위의 Query가 UPDATE라면 rs = { affectedRows: 1 ... }
3. files QUery는 아래와 같다.
	가. 신규글이라면 아래와 같이 INSERT만 하면 된다.
	INSERT INTO files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=?, fidx=?
	- fidx 어디서 ? => rs.insertId

	나. 업데이트라면 일단 k.substr(0, 1).toUpperCase() ? 'C' :'U' 분기하고, 기존레코드가 있는지 체크한 후에 있다면 기존 레코드의 status = '0' 파일도 옮긴다.
	그리고 가)의 INSERT를 실행한다.

	- idx 어디서 ?	=> SELECT * FROM files WHERE fidx = idx
	- UPDATE files SET status = '0' WHERE idx=?
*/

const { pool } = require('../../modules/mysql-init')

const createBook = async book => {
	try {
		let { fidx, title, writer, content } = book
		let sql = " INSERT INTO books SET fidx=?, title=?, writer=?, content=? "
		const [rs] = await pool.execute(sql, [fidx, title, writer, content])
		return { success: true, idx: rs.insertId }
	}
	catch(err) {
		throw new Error(err)
	}
}

module.exports = { createBook } 