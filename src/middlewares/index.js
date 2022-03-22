const authentication = require('./authentication')
const errorHandler = require('./errorHandler')
const unknownEndpoint = require('./unknownEndpoint')

module.exports = {
  authentication,
  errorHandler,
  unknownEndpoint
}