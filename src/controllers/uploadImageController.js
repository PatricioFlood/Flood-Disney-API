const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises')

const upload = (folder) => multer ({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, `./public/storage/${folder}`),
    filename: (_, file, cb) => cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`),
  }),
  limits: {
    fileSize: 1000000
  },
  fileFilter(_, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      cb(new Error('Please upload a valid image file (png, jpg or jpeg).'))
    } 
    cb(undefined, true)
  }
})

const uploadImage = (Model, folder) => async (req, res) => {
  const id = req.params.id
  const model = await Model.findByPk(id)

  if(!model)
    return res.status(404).end()

  upload(folder).single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ error: error.message })
    } else if (error) {
      return res.status(400).json({ error: 'Please upload a valid image file (png, jpg or jpeg).' })
    } else if (!req.file) {
      return res.status(400).json({ error: 'image file is required' })
    }
    const image = req.file.destination.substring(8) + `/${req.file.filename}`
    const modelImage = model.image
    model.set({image})
    await model.save()
    if(modelImage)
      await deleteImage(modelImage)

    return res.json(model)
  })
}

const deleteImage = async (path) => await fs.unlink(`./public/${path}`)

module.exports = { uploadImage, deleteImage }