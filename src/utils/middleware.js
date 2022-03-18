const logger = require('./logger')
const jwt = require('jsonwebtoken')


const authentication = (request, response, next) => {
  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

  const token = getTokenFrom(request)
  if(!token)
    return response.status(401).json({ error: 'not athenticated' })

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken)
    return response.status(401).json({ error: 'invalid token' })

  request.userId = decodedToken
  next()
}

const requestLogger = (request, _, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ 
      error: `${error.errors[0].path} is required` 
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } 
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  authentication
}