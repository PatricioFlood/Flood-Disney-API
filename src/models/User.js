const { DataTypes } = require('Sequelize');;
const sequelize =  require('../utils/sequelize')

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  name: DataTypes.STRING(100),
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
})

module.exports = User