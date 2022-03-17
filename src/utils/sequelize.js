const { Sequelize } = require('sequelize');
const config = require('./config')

const sequelize = new Sequelize(config.DATABASE_URL, {
  logging: false,
  ssl: {
    require: config.NODE_ENV === 'production',
    rejectUnauthorized: false
  }
})

sequelize.authenticate()
  .then( _ => console.log('Connection to DB has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error))

module.exports = sequelize
