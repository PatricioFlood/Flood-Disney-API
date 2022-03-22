const s3 = require('../utils/s3')
const logger = require('../utils/logger')
const getSlug = require('speakingurl')

const uploadImage = (Model) => async (req, res) => {
  const id = req.params.id
  const model = await Model.findByPk(id)
  if(!model)
    return res.status(404).end()

  const file = req.files.image
  if(file.length)
    return res.json({ error: 'Please upload only one file' })

  const fileExtension =
    file.path.substring(file.path.lastIndexOf('.') + 1).toLowerCase()

  if (!['png','jpg', 'jpeg'].includes(fileExtension))
    return res.json({ error: 'Please upload a valid image file (png, jpg or jpeg)' })
    
  const name = getSlug(model.name || model.title, { maintainCase: true })
  const params = {
    Bucket: s3.bucket,
    Key: `${Model.name}/${model.id}-${name}.${fileExtension}`,
    Body: file,
    ACL:'public-read'
  }

  const upload = await s3.uploadFile(params)
  const image = upload.Location
  
  const modelImage = model.image

  model.set({image})
  await model.save()

  if(modelImage)
      await deleteImage(modelImage)
    
  return res.json(model)
}

const deleteImage = async (url) => {
  try {
    const path = new URL(url).pathname
    const params = {
      Bucket: s3.bucket,
      Key: path,
    }
    await s3.deleteFile(params)
  } catch(err) {
    logger.info({ DeleteFileError: err.message })
  }
}

module.exports = { uploadImage, deleteImage }