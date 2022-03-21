const os = require('os')
const uploadImageController = require('../../controllers/uploadImageController')

const formData = require('express-form-data');
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

const uploadImageRouter = (Model) => {
  const router = require('express').Router()

  router.use(formData.parse(options))
  router.use(formData.format())
  router.use(formData.stream())
  router.post(
    '/:id/uploadImage',
    uploadImageController.uploadImage(Model)
  )

  return router
} 

module.exports = uploadImageRouter
