const session = require('express-session')

const expressSession = session({
	secret: process.env.COOKIE_SALT,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
})

module.exports = app => {
	app.set('trust proxy', 1)
	return expressSession
}
