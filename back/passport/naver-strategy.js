const NaverStrategy = require('passport-naver').Strategy
const { createSnsUser, existUser } = require('../models/auth')

const cb = async (accessToken, refreshToken, profile, done) => {
	try {
		// console.log('==================')
		// console.log(accessToken)
		// console.log(refreshToken)
		// console.log(profile)
		// console.log('==================')
		let user = { userid: profile.id, accessToken }
		let userSns = { accessToken, refreshToken, provider: 'NA', snsid: profile.id, 
			snsName: profile._json.name || null,
			displayName: profile.displayName || null,
			profileURL: profile._json.profile_image || null,
			email: profile._json.email || null,
		}
		let { success, idx } = await existUser('userid', user.userid)
		if(success) {
			user.idx = idx
		}
		else {
			let { idx: id } = await createSnsUser(user, userSns)
			user.idx = id
		}
		done(null, user)
	}
	catch(err) {
		done(err)
	}
}

const naverStrategy = new NaverStrategy({
	clientID: process.env.NAVER_KEY,
	clientSecret: process.env.NAVER_SALT,
	callbackURL: '/auth/naver/cb'
}, cb)

module.exports = passport => passport.use(naverStrategy)