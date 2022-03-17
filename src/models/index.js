const User = require('./User')
const Character = require('./Character')
const Movie = require('./Movie')
const Genre = require('./Genre')

Character.belongsToMany(Movie, { through: 'character_movie', timestamps: false })
Movie.belongsToMany(Character, { through: 'character_movie', timestamps: false })
Genre.hasMany(Movie)
Movie.belongsTo(Genre)

module.exports = {
  User,
  Character,
  Movie,
  Genre
}