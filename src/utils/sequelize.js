const { Sequelize } = require('sequelize');
const config = require('./config')
const logger = require('./logger')

const dialectOptions = {}
if(config.NODE_ENV === 'production') 
  dialectOptions.ssl = { rejectUnauthorized: false }

const sequelize = new Sequelize(config.DATABASE_URL, {
  logging: false,
  dialectOptions
})

sequelize.authenticate()
  .then( _ => logger.info('Connection to DB has been established successfully.'))
  .catch(error => logger.info('Unable to connect to the database:', error))

module.exports = sequelize
