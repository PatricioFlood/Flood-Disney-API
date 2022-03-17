const { DataTypes } = require('sequelize')
const sequelize =  require('../utils/sequelize')

const Movie = sequelize.define('movies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  creationDate: DataTypes.DATE,
  image: DataTypes.TEXT,
  calification: DataTypes.SMALLINT,
  genreId: DataTypes.INTEGER
}, {
  timestamps: false
})

module.exports = Movie