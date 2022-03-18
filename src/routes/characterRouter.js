const characterRouter = require('express').Router()
const crudRouter = require('./crudRouter')
const characterController = require('../controllers/characterController')

characterRouter.use('/', crudRouter(characterController))

module.exports = characterRouter