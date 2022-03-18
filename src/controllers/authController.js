const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = jwt.sign(user.id, process.env.SECRET)

  res
    .status(200)
    .send({ token, email: user.email, name: user.name })
}

const register = async (req, res) => {
  const { email, name, password } = req.body

  if(!password)
    return res.status(400).json({ error: 'password is required' })

  if(password.length < 6)
    return res.status(400).json({ error: 'password must have at least 6 characters' })

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
    email,
    name,
    password: passwordHash
  })

  const token = jwt.sign(user.id, process.env.SECRET)
  user.token = token

  res.json(user)
}

module.exports = {
  login,
  register
}
