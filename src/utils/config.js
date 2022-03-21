require('dotenv').config()

const DATABASE_URL = (process.env.NODE_ENV === 'test') 
  ? process.env.TEST_DATABASE_URL 
  : process.env.DATABASE_URL
  
const { 
  PORT, 
  NODE_ENV, 
  SECRET, 
  SENDGRID_API_KEY, 
  SENDGRID_EMAIL_FROM 
} = process.env

module.exports = {
  DATABASE_URL,
  NODE_ENV,
  PORT,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL_FROM,
  SECRET
}