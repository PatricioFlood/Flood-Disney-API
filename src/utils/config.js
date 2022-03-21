require('dotenv').config()

const PORT = process.env.PORT
let DATABASE_URL = process.env.DATABASE_URL
const NODE_ENV = process.env.NODE_ENV
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const SECRET = process.env.SECRET
const { SENDGRID_EMAIL_FROM } = process.env

if (process.env.NODE_ENV === 'test') {
  DATABASE_URL = process.env.TEST_DATABASE_URL
}

module.exports = {
  DATABASE_URL,
  NODE_ENV,
  PORT,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL_FROM,
  SECRET
}