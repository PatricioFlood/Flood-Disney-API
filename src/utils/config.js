require('dotenv').config()

const testEnv = process.env.NODE_ENV === 'test'

const PORT = testEnv ? 3001 : process.env.PORT

const TEST_USER = {
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD
}

const {
  DATABASE_URL,
  NODE_ENV,
  SECRET,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL_FROM,
} = process.env

module.exports = {
  DATABASE_URL,
  PORT,
  NODE_ENV,
  SECRET,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL_FROM,
  TEST_USER
}