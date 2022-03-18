const router = require('express').Router()
const authRouter = require('./authRouter')
const movieRouter = require('./movieRouter')
const characterRouter = require('./characterRouter')
const storageRouter = require('./storageRouter')
const genreRouter = require('./genreRouter')
const middleware = require('../utils/middleware')

router.use('/auth', authRouter)

router.use('/characters', characterRouter)
router.use('/movies', movieRouter)
router.use('/genres', genreRouter)
router.use('/storage', storageRouter)

router.use(middleware.unknownEndpoint)
router.use(middleware.errorHandler)

module.exports = router