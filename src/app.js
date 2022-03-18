const express = require('express')
const cors = require('cors')
require('express-async-errors')

require('./utils/sequelize')
const router = require('./routes/router')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(router)

module.exports = app