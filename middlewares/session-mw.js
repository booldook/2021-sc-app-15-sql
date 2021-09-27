const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

const storeOptions = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	expiration: 86400000,
}

const expressSession = session({
	secret: process.env.COOKIE_SALT,
	resave: false,
	saveUninitialized: true,
	store: new MySQLStore(storeOptions),
	cookie: { 
		secure: false,
		httpOnly: true,
	},
})

module.exports = app => {
	app.set('trust proxy', 1)
	return expressSession
}
