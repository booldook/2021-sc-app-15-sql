/************* global require *************/
require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

/*************** server init **************/
require('./modules/server-init')(app, process.env.PORT)


/*************** middleware ***************/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())


/*************** logger init **************/
const logger = require('./middlewares/morgan-mw')
app.use(logger)


/*************** router init **************/
const bookRouter = require('./routes/book')

app.use('/book', bookRouter)


/**************** error init **************/
const _404Router = require('./routes/error/404-router')
const _500Router = require('./routes/error/500-router')

app.use(_404Router)
app.use(_500Router)

