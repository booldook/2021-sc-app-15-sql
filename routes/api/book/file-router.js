const path = require('path')
const express = require('express')
const router = express.Router()
const { error, moveFile } = require('../../../modules/util')
const { pool } = require('../../../modules/mysql-init')

router.delete('/:idx', async (req, res, next) => {
	try {
		sql = "UPDATE files SET status='0' WHERE idx = " + req.params.idx
		console.log(sql)
		await pool.execute(sql)
	
		sql = "SELECT savename FROM files WHERE idx = " + req.params.idx
		console.log(sql)
		const [rs] = await pool.execute(sql)
	
		for(let { savename } of rs) {
			await moveFile(savename)
		}
		res.status(200).json({ code: 200, result: 'success' })
	}
	catch(err) {
		res.status(500).json(err)
	}
})


module.exports = router