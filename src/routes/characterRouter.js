const characterRouter = require('express').Router()
const crudRouter = require('./crudRouter')
const characterController = require('../controllers/characterController')
const middleware = require('../utils/middleware')

characterRouter.use(middleware.authentication)
characterRouter.use('/', crudRouter(characterController))

module.exports = characterRouter