/************* global require *************/
const express = require('express')
const app = express()
const path = require('path')
const methodInit = require('./modules/method-init')


/*************** server init **************/
require('dotenv').config()
require('./modules/server-init')(app, process.env.PORT_API)


/*************** middleware ***************/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodInit())	// method-override


/*************** static init **************/
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'storages')))


/*************** router init **************/
const bookRouter = require('./routes-api/book')
app.use('/book', bookRouter)



/**************** error init **************/
const _404Router = require('./routes-api/error/404-router')
const _500Router = require('./routes-api/error/500-router')

app.use(_404Router)
app.use(_500Router)



