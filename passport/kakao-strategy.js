const KakaoStrategy = require('passport-kakao').Strategy
// const {  }

const cb = (accessToken, refreshToken, profile, done) => {

}

const kakaoStrategy = new KakaoStrategy({
	clientID: process.env.KAKAO_KEY,
	clientSecret: process.env.KAKAO_SALT,
	callbackURL: '/auth/kakao/cb'
}, cb)

module.exports = passport => passport.use(kakaoStrategy)