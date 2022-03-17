const router = require('express').Router()
const apiRouter = require('./apiRouter')
const authRouter = require('./authRouter')
const movieController = require('../controllers/movieController')
const characterController = require('../controllers/characterController')
const middleware = require('../utils/middleware')

router.use('/auth', authRouter)
router.use('/characters', apiRouter(characterController))
router.use('/movies', apiRouter(movieController))
router.use(middleware.unknownEndpoint)
router.use(middleware.errorHandler)

module.exports = router