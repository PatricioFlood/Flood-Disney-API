const { DataTypes } = require('sequelize');;
const sequelize =  require('../utils/sequelize')

const Character = sequelize.define('characters', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  age: DataTypes.SMALLINT,
  image: DataTypes.TEXT,
  weight: DataTypes.SMALLINT,
  history: DataTypes.TEXT,
}, {
  timestamps: false
})

module.exports = Character
