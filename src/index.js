const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = app.listen(
  config.PORT, 
  () => logger.info(`App listening on port ${config.PORT}`)
)

module.exports = server