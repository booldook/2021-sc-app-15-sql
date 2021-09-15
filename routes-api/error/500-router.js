module.exports = (error, req, res, next) => {
	// console.error(error)
	res.status(error.status).json({ status: error.status, message: error.message })
}