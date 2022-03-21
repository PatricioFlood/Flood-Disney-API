const sgMail = require('@sendgrid/mail')
const config = require('../utils/config')

sgMail.setApiKey(config.SENDGRID_API_KEY)

const sendWelcomeMail = async ({email, name}) => {
  const body = `Hi ${name}, welcome to Flood Disney API`
  const msg = {
    to: email, 
    from: config.SENDGRID_EMAIL_FROM, 
    subject: 'Welcome to Flood Disney API',
    text: body,
    html: `<strong>${body}</strong>`,
  }
  if(process.env.NODE_ENV === 'production')
    await sgMail.send(msg)
  else
    console.log({email: msg})
}

module.exports = sendWelcomeMail
