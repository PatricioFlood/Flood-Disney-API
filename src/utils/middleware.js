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

  switch(error.name){

    case 'SequelizeValidationError':
      const errorMessage = error.message.split(': ')

      if(errorMessage[0] && errorMessage[0] == 'notNull Violation')
        error = `${error.errors[0].path} is required`
      else
        error = errorMessage[1] || error.message

      return response.status(400).json({ error })

    case 'SequelizeUniqueConstraintError':
      return response.status(400).json({ 
        error: `${error.original.constraint} already exists`,
      })

    case 'SequelizeDatabaseError':
      return response.status(400).json({ 
        error: 'malformed body'
      })

    case 'JsonWebTokenError':
      return response.status(401).json({
        error: 'invalid token'
      })
    case 'SyntaxError':
      if(error.status === 400 && 'body' in error)
        return response.status(400).json({ error: 'malformed body' })
    default:
      logger.error(error)
      return response.sendStatus(500); 
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  authentication
}