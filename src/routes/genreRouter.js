const genreRouter = require('express').Router()
const crudRouter = require('./crudRouter')
const genreController = require('../controllers/genreController')
const middleware = require('../utils/middleware')

genreRouter.use(middleware.authentication)
genreRouter.use('/', crudRouter(genreController))

module.exports = genreRouter