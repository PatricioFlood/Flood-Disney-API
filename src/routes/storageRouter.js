const storageRouter = require('express').Router()
const storageController = require('../controllers/storageContoller')
const middleware = require('../utils/middleware')

storageRouter.use(middleware.authentication)
storageRouter.post('/', storageController.singleUpload, storageController.fileResponse)

module.exports = storageRouter