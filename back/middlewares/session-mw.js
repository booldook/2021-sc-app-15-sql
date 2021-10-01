const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const { pool } = require('../modules/mysql-init')

const storeOptions = {
	expiration: 86400000,
}

const expressSession = session({
	secret: process.env.COOKIE_SALT,
	resave: false,
	saveUninitialized: true,
	store: new MySQLStore(storeOptions, pool),
	cookie: { 
		secure: false,
		httpOnly: true,
	},
})

module.exports = app => {
	app.set('trust proxy', 1)
	return expressSession
}
