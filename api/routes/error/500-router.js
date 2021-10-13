module.exports = (error, req, res, next) => {
	const err = { status: error.status || 500, message: error.message }
	if(error.sql) {
		err.desc = '<b>CODE:</b> ' + error.code + '<br>'
		err.desc += '<b>ERR NO:</b> ' + error.errno + '<br>'
		err.desc += '<b>SQL:</b> ' + error.sql + '<br>'
		err.desc += '<b>STATE:</b> ' + error.sqlState + '<br>'
	}
	else {
		err.desc = '서버 에러입니다. 관리자에게 문의하세요.'
		switch(error.status) {
			case 400:
				err.desc = '요청이 잘못되었습니다.'
				break;
			case 401:
				err.desc = '사용자 인증이 처리되지 않았습니다.'
				break;
			case 403:
				err.desc = '허가되지 않은 접근입니다.'
				break;
			case 404:
				err.desc = '경로를 찾을 수 없습니다.'
				break;
			case 500:
				err.desc = '서버 내부 에러입니다. 잠시후 다시 시도해 주세요.'
				break;
		}
	}
	res.status(err.status).json(err)
}