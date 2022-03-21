const { DataTypes } = require('sequelize');;
const sequelize =  require('../utils/sequelize')

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: { msg: 'Email is required' },
    validate: {
      isEmail: { msg: 'Invalid email address' },
    },
    unique: true
  },
  name: DataTypes.STRING(100),
  password: DataTypes.TEXT
})

module.exports = User

/**
 *  @openapi
 *  components:
 *    schemas:
 *      LoginUser:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            readOnly: true
 *            example: 1
 *          email:
 *            type: string
 *            example: name@mail.com
 *          password: 
 *            type: string
 *            example: 123456
 *            writeOnly: true
 *          token: 
 *            type: string
 *            example: eyJhbGciOiJIUzI1NiJ8.MQ.28fPLZWzdebJstob56FpbOi9zbxjNaGLGzUzJewlsOE
 *            readOnly: true
 *        required: [id, email, password, token]
 */

/**
 *  @openapi
 *  components:
 *    schemas:
 *      User:
 *        allOf:
 *          - $ref: '#components/schemas/LoginUser'
 *          - type: object
 *            properties:
 *              name: 
 *                type: string
 *                example: Patricio Flood
 *            required: [name]
 */