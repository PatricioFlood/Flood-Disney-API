require('dotenv').config()

const PORT = process.env.PORT
let DATABASE_URL = process.env.DATABASE_URL

if (process.env.NODE_ENV === 'test') {
  DATABASE_URL = process.env.TEST_DATABASE_URL
}

module.exports = {
  DATABASE_URL,
  PORT
}