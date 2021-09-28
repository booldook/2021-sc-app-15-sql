const path = require('path')
const express = require('express')
const router = express.Router()
const { moveFile } = require('../../../modules/util')
const { updateFile, findFile } = require('../../../models/file')

router.delete('/:idx', async (req, res, next) => {
	try {
		await updateFile(req.params.idx, [['status', '0']])
		const { file } = await findFile(req.params.idx)
		await moveFile(file.savename)
		res.status(200).json({ code: 200, result: 'success' })
	}
	catch(err) {
		res.status(500).json(err)
	}
})

module.exports = router