const validator = require('validator')

module.exports = (user) => {
	let { userid, passwd, passwd2, username, email } = user
	if(!validator.isAlphanumeric(userid) || userid.length < 6 || userid.length > 24) {
		return false
	}
	else if(passwd.length < 6 || passwd.length > 24 || passwd2.length < 6 || passwd2.length > 24 || passwd !== passwd2) {
		return false
	}
	else if(username.length === 0) {
		return false
	}
	else if (!validator.isEmail(email)) {
		return false
	}
	else return true
}