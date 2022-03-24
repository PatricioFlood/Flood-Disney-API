const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const authRouter = require('./authRouter')
const movieRouter = require('./movieRouter')
const characterRouter = require('./characterRouter')
const genreRouter = require('./genreRouter')
const middleware = require('../../middlewares/index')
const { swaggerDocs, uiOptions } = require('../../utils/swaggerJsdoc')

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocs, uiOptions))

router.use('/auth', authRouter)
router.use('/characters', characterRouter)
router.use('/movies', movieRouter)
router.use('/genres', genreRouter)

router.use(middleware.unknownEndpoint)

module.exports = router