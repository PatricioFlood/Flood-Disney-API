const multer = require('multer')
const { v4: uuidv4 } = require('uuid');

const upload = multer ({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, './public/storage'),
    filename: (_, file, cb) => cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`)
  }),
  limits: {
    fileSize: 1000000
  },
  fileFilter(_, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      cb(new Error('Please upload an image.'))
    } 
    cb(undefined, true)
  }
})

const singleUpload = upload.single('upload')

const fileResponse = (req, res) => res.json({ url: `/storage/${req.file.filename}` })

module.exports = {
  singleUpload,
  fileResponse
}