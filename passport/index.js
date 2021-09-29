const local = require('./local-strategy')
const kakao = require('./kakao-strategy')
const { findUser } = require('../models/auth')

const serialize = (user, done) => {
	done(null, user.idx)
}

const deserialize = async (idx, done) => {
	try {
		const { success, user } = await findUser('idx', idx)
		if(success) done(null, user)
		else done(null, false, '사용자 정보가 없습니다.')
	}
	catch(err) {
		done(err)
	}
}

module.exports = passport => {
	passport.serializeUser(serialize)				// req.user -> idx (cookie -> session)
	passport.deserializeUser(deserialize)		// req.user <- DB user 정보 (session)
	local(passport)
	kakao(passport)
	// naver(passport)
}