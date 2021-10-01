const express = require('express')
const router = express.Router()
const { updateKey } = require('../../../models/auth')

router.get('/:idx', async (req, res, next) => {
	try {
		let { ERROR } = req.app.locals
		let { success, apikey } = await updateKey(req.params.idx)
		if(success) res.status(200).json({ code: 200, apikey })
		else res.status(500).json(ERROR.SQL_ERROR)
	}
	catch(err) {
		res.status(500).json(err)
	}
})

module.exports = router