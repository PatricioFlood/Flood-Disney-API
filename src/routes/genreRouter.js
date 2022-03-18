const genreRouter = require('express').Router()
const crudRouter = require('./crudRouter')
const genreController = require('../controllers/genreController')

genreRouter.use('/', crudRouter(genreController))

module.exports = genreRouter