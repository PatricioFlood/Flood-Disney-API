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
    allowNull: false,
    unique: true
  },
  name: DataTypes.STRING(100),
  password: DataTypes.TEXT
})

module.exports = User