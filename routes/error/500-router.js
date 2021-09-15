module.exports = (error, req, res, next) => {
	const err = { status: error.status || 404 }
	if(error.sql) {
		err.message = error.message;
		err.desc = '<b>CODE:</b> ' + error.code + '<br>'
		err.desc += '<b>ERR NO:</b> ' + error.errno + '<br>'
		err.desc += '<b>SQL:</b> ' + error.sql + '<br>'
		err.desc += '<b>STATE:</b> ' + error.sqlState + '<br>'
	}
	else {
		err.message = error.message
		err.desc = null
	}
	res.render('error/error', err)
}