


const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { moveFile } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-book-mw')
const { isUser, isGuest, isMyBook } = require('../../middlewares/auth-mw')
const { updateBook, createBook } = require('../../models/book')
const { findBookFiles, updateFile, createFile } = require('../../models/file')


router.post('/', isUser, uploader.fields([{name: 'cover'}, {name: 'upfile'}]), isMyBook('body', 'U'), async (req, res, next) => {
	try {
		let book = { ...req.body, fidx: req.session.user.idx }
		let isUpdate = book._method === 'PUT' && book.idx
		const { idx: bookIdx } = isUpdate ? await updateBook(book) : await createBook(book)
		
		if(req.files) {
			let fieldname;
			for(let [k, [v]] of Object.entries(req.files)) {
				fieldname = k.substr(0, 1).toUpperCase()
				if(isUpdate) { // 기존파일 처리
					let { files } = await findBookFiles({ fidx: bookIdx, fieldname, status: '1' })
					console.log(files)
					if(files.length > 0) {
						await updateFile(files.idx, [['status', '0']])
						await moveFile(files.savename)
					}
				}
				await createFile({
					oriname: v.originalname,
					savename: v.filename,
					mimetype: v.mimetype,
					size: v.size,
					fieldname, 
					fidx: bookIdx 
				})
			}
			res.redirect(`/${req.lang}/book`)
		}
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router