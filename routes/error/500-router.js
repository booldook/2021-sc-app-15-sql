module.exports = (error, req, res, next) => {
	res.render('error/error', { status: error.status, message: error.message })
}