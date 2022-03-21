const router = require('express').Router()
const apiRouter = require('./api/index')

router.use('/', apiRouter)

module.exports = router