const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')

const mysql = require('mysql2')
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

router.get('/list', (req, res, next) => {
	let sql = 'SELECT * FROM books'
	const onResult = (err, r) => {
		res.status(200).json(r)
	}
	connection.query(sql, onResult)
})

router.get('/create', (req, res, next) => {
	let title = '홍길동전'
	let writer = '허균'
	let content = '아버지를 아버지라...'
	let sql = `INSERT INTO books SET title='${title}', writer='${writer}', content='${content}'`
	const onResult = (err, r) => {
		res.status(200).json(r)
	}
	connection.query(sql, onResult)
})

module.exports = router