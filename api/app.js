/************* global require *************/
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')

const logger = require('./middlewares/morgan-mw')


/*************** server init **************/
require('./modules/server-init')(app, process.env.PORT)


/*************** middleware ***************/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/*************** logger init **************/
app.use(logger)


/*************** router init **************/
const bookRouter = require('./routes/book')

app.use('/book', bookRouter)


/**************** error init **************/
const _404Router = require('./routes/error/404-router')
const _500Router = require('./routes/error/500-router')

app.use(_404Router)
app.use(_500Router)

