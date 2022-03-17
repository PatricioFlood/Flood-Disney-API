const express = require('express')
const cors = require('cors')

require('./utils/sequelize')
const router = require('./routes/router')

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

module.exports = app