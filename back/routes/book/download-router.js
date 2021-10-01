const path = require('path')
const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const { error, absPath } = require('../../modules/util')
const { findFile } = require('../../models/file')

router.get('/:idx', async (req, res, next) => {
	try {
		const { file } = await findFile(req.params.idx)
		res.status(200).download(absPath(file.savename), file.oriname)
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router