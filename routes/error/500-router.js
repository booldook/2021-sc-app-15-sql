module.exports = (error, req, res, next) => {
	console.error(error)
	res.render('error/error', { status: error.status, message: error.message })
}