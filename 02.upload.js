const express = require('express')
const app = express()
const path = require('path')
const uploader = require('./middlewares/multer-mw')


require('dotenv').config()
require('./modules/server-init')(app, process.env.PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', express.static(path.join(__dirname, 'public')))

// app.post('/file', upload.single('upfile'), (req, res, next) => {
// app.post('/file', upload.array('upfile'), (req, res, next) => {
// app.post('/file', upload.fields([{name: 'upfile'}, {name: 'avatarfile'}]), (req, res, next) => {

app.post('/file', uploader.single('upfile'), (req, res, next) => {
	res.json({ ...req.body, ...req.file })
})