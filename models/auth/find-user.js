const validator = require('validator')
const bcrypt = require('bcrypt')
const { pool } = require('../../modules/mysql-init')
const { isUser, isEmail } = require('./verify-data')

/*
findUser()
key = value ORDER BY key [DESC, ASC] LIMIT 0, 10
opt.key = 'idx' => key = value
opt.key = { fields: ['userid', 'id'], op: 'AND' }
opt.value = ['booldook', '2'] => WHERE userid = value1 OR[AND] passwd = value2
*/
const findUser = (opt) => {
	
}

module.exports = { findUser }