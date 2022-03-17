require('dotenv').config()

const PORT = process.env.PORT
let DATABASE_URL = process.env.DATABASE_URL
const NODE_ENV = process.env.NODE_ENV

if (process.env.NODE_ENV === 'test') {
  DATABASE_URL = process.env.TEST_DATABASE_URL
}

module.exports = {
  DATABASE_URL,
  NODE_ENV,
  PORT
}