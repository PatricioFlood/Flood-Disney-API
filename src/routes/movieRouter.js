const movieRouter = require('express').Router()
const crudRouter = require('./crudRouter')
const movieController = require('../controllers/movieController')

movieRouter.use('/', crudRouter(movieController))
movieRouter.post('/:id/characters', movieController.asociateCharacter)
movieRouter.delete('/:id/characters/:characterId', movieController.desasociateCharacter)

module.exports = movieRouter