const LocalStrategy = require('passport-local').Strategy
const { pool } = require('../modules/mysql-init')

const cb = () => {
	
}
const localStrategy = new LocalStrategy({}, cb)

module.exports = (passport) => passport.use(localStrategy)