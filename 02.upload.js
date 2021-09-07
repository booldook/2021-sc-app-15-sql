const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config()
require('./modules/server-init')(app, process.env.PORT)

app.use('/', express.static( path.join(__dirname, 'public') ))