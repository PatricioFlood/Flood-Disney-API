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

module.exports = authentication