const { DataTypes } = require('sequelize');;
const sequelize =  require('../utils/sequelize')

const Genre = sequelize.define('genres', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: DataTypes.TEXT
}, {
  timestamps: false
})

module.exports = Genre