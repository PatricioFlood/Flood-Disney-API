const logger = require('../utils/logger')

const errorHandler = (error, _request, response, _next) => {
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
    case 'SequelizeForeignKeyConstraintError':
      return response.status(400).json({ 
        error: `${error.original.constraint} ID not exists`,
      })
    case 'SequelizeDatabaseError':
      return response.status(400).json({ 
        error: 'malformed field'
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

module.exports = errorHandler

/**
 *  @openapi
 *  components:
 *    schemas:
 *      Error:
 *        type: object
 *        properties:
 *          error:
 *            type: string
 */

/**
 *  @openapi
 *  components:
 *    responses:
 *      Unauthorized:
 *        description: 'Error: Unauthorized'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Error'
 *            examples:
 *              Not Authenticated:
 *                value: { error: not authenticated }
 *              Invalid Token:
 *                value: { error: invalid token }
 */

/**
 *  @openapi
 *  components:
 *    responses:
 *      BadRequest:
 *        description: 'Error: Bad Request'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Error'
 *            examples: 
 *              Missing Required Field:
 *                value: { error: field is required }
 *              Malformed Field:
 *                value: { error: malformed field }
 *              Malformed Body:
 *                value: { error: malformed body }
 * 
 */

/** 
 *  @openapi
 *  components:
 *    securitySchemes:
 *      jsonWebToken:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 */