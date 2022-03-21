const uploadImageController = require('../../controllers/uploadImageController')

const uploadImageRouter = (Model, folder) => {
  const router = require('express').Router()

  router.post(
    '/:id/uploadImage',
    uploadImageController.uploadImage(Model, folder)
  )

  return router
} 

module.exports = uploadImageRouter
