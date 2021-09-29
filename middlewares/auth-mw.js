const { findMyBook } = require('../models/book')
const { alert } = require('../modules/util')


const isUser = (req, res, next) => {
	if(req.user) next()
	else res.send(alert('로그인 후 이용하세요'))
}

const isGuest = (req, res, next) => {
	if(req.user) res.send(alert('회원은 이용하실수 없습니다.'))
	else next()
}

const isMyBook = (name, mode) => {
	return async (req, res, next) => {
		const { idx, _method } = eval(`req.${name}`)
		const fidx = req.user.idx
		if(mode === 'U' && _method !== 'PUT') next()
		else {
			const { success } = await findMyBook(idx, fidx)
			if(success) next()
			else res.send(alert('정상적인 접근이 아닙니다. -.-'))
		}
	}
}

module.exports = { isUser, isGuest, isMyBook }