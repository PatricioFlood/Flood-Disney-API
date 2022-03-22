const express = require('express')
const cors = require('cors')
require('express-async-errors')
const middleware = require('./middlewares/index')

require('./utils/sequelize')
const router = require('./routes/router')

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)
app.use(middleware.errorHandler)

module.exports = app