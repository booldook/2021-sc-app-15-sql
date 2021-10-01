// findUser, verifyData, createUser, updateUser, deleteUser

module.exports = { 
	...require('./create-user'),
	...require('./update-user'),
	...require('./find-user'),
}