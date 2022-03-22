const aws = require('aws-sdk')
aws.config.update({ region: 'sa-east-1' })
const s3 = new aws.S3({ apiVersion: '2006-03-01' })

const uploadFile = (params) => s3.upload(params).promise()

const deleteFile = (params) => s3.deleteObject(params).promise()

const bucket = 'flood-disney-api'

module.exports = {
  uploadFile,
  deleteFile,
  bucket
}