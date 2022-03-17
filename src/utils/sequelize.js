const { Sequelize } = require('sequelize');
const config = require('./config')

const dBUrl = config.DATABASE_URL + (config.NODE_ENV === 'production' ? '?sslmode=require' : '')
const sequelize = new Sequelize(dBUrl, {logging: false})

sequelize.authenticate()
  .then( _ => console.log('Connection to DB has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error))

module.exports = sequelize
