const LocalStrategy = require('passport-local').Strategy
const { loginUser } = require('../models/auth')

const cb = async (userid, passwd, done) => {
	try {
		const { success, user } = await loginUser(userid, passwd)
		if(success) done(null, user)
		else done(null, false, '아이디와 패스워드를 확인하세요.')
	}
	catch(err) {
		done(err)
	}
}

const fields = {
	usernameField: 'userid',
	passwordField: 'passwd'
}

const localStrategy = new LocalStrategy(fields, cb)

module.exports = (passport) => passport.use(localStrategy)