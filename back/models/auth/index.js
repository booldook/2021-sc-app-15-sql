// findUser, verifyData, createUser, updateUser, deleteUser

module.exports = { 
	...require('./create-user'),
	...require('./update-user'),
	...require('./delete-user'),
	...require('./find-user'),
	...require('./update-key'),
}