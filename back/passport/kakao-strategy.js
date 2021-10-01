const KakaoStrategy = require('passport-kakao').Strategy
const { createSnsUser, existUser } = require('../models/auth')

const cb = async (accessToken, refreshToken, profile, done) => {
	try {
		// console.log('==================')
		// console.log(accessToken)
		// console.log(refreshToken)
		// console.log(profile)
		// console.log('==================')
		let user = { userid: profile.id, accessToken }
		let userSns = { accessToken, refreshToken, provider: 'KA', snsid: profile.id, 
			snsName: profile.username || null,
			displayName: profile.displayName || null,
			profileURL: profile._json.properties.profile_image || null,
			email: profile._json.kakao_account.email || null,
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

const kakaoStrategy = new KakaoStrategy({
	clientID: process.env.KAKAO_KEY,
	clientSecret: process.env.KAKAO_SALT,
	callbackURL: '/auth/kakao/cb'
}, cb)

module.exports = passport => passport.use(kakaoStrategy)