const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const { serverPath } = require('../../modules/util')
const { findFile } = require('../../models/file')

router.get('/:idx', async (req, res, next) => {
	try {
		// const { file } = await findFile(req.params.idx)
		res.redirect(process.env.BACK_URL+req.params.idx)
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router