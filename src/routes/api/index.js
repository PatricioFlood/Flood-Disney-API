const router = require('express').Router()
const swaggerUi = require('swagger-ui-express');
const authRouter = require('./authRouter')
const movieRouter = require('./movieRouter')
const characterRouter = require('./characterRouter')
const genreRouter = require('./genreRouter')
const middleware = require('../../utils/middleware')
const swaggerJsdoc = require('../../utils/swaggerJsdoc')

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerJsdoc, options));

router.use('/auth', authRouter)
router.use('/characters', characterRouter)
router.use('/movies', movieRouter)
router.use('/genres', genreRouter)

router.use(middleware.unknownEndpoint)
router.use(middleware.errorHandler)

module.exports = router