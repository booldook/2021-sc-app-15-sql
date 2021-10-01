module.exports = { 
	...require('./create-book'),
	...require('./update-book'), 
	...require('./find-book'), 
	...require('./delete-book'), 
}