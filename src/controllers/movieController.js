const { Movie, Character, Genre } = require('../models/index')
const { Sequelize } = require('sequelize')
const uploadImageController = require('./uploadImageController')

const view = async (req, res) => {
  const id = req.params.id
  if(id){
    const movie = await Movie
      .findByPk(id, {
        include: [
          Genre,
          {
            model: Character,
            through: { attributes: [] },
            attributes: ['id', 'name', 'image'],
          }
        ],
        attributes: { exclude: 'genreId' }
      })

    if(movie)
      return res.json(movie)

    return res.status(404).end()
  }

  const filter = getFilters(req.query)
  const order = req.query.order
  const orderType = order
    ? (order === 'DESC' || order === 'ASC' ? order : null)
    : null

  let movies = await Movie
    .findAll({
      attributes: ['id', 'image', 'title', 'creationDate'],
      where: filter,
      order: orderType?[['creationDate', orderType]]:[]
    })

  return res.json(movies)
}

const create = async (req, res) => {
  delete req.body.id
  delete req.body.image

  const movie = await Movie.create(req.body)
  const characters = req.body.characters

  if(characters)
    await Promise.all(characters.map(async character => {
      if (await Character.findByPk(character.id)){
        await movie.addCharacter(character.id)
      }
    }))

  const createdMovie = await Movie.findByPk(movie.id, { include: Character } )
  return res.status(201).json(createdMovie)
}

const update = async (req, res) => {
  const id = req.params.id
  delete req.body.id
  delete req.body.image

  const movie = await Movie.findByPk(id)
  if(movie){
    movie.set(req.body)
    await movie.save()
    return res.json(movie)
  }

  return res.status(404).end()
}

const remove = async (req, res) => {
  const id = req.params.id
  const movie = await Movie.findByPk(id)
  if(movie){
    if(movie.image)
      await uploadImageController.deleteImage(movie.image)

    await movie.destroy()
  }
  return res.status(204).end()
}

const asociateCharacter = async (req, res) => {
  const movieId = req.params.id
  const characterId = req.body.id

  if(!characterId)
    return res.status(400).json({ error: 'field "id" is required' })

  const movie = await Movie.findByPk(movieId)
  const character = await Character.findByPk(characterId)

  if(!movie && character)
    return res.status(404).end()

  await movie.addCharacter(characterId)
  const updatedMovie = await Movie
    .findByPk(movieId, {
      include: [
        Genre,
        {
          model: Character,
          through: { attributes: [] },
          attributes: ['id', 'name', 'image'],
        }
      ],
      attributes: { exclude: 'genreId' }
    })
  return res.json(updatedMovie)
}

const desasociateCharacter = async (req, res) => {
  const id = req.params.id
  const characterId = req.params.characterId
  const movie = await Movie
    .findByPk(id)

  if(movie){
    await movie.removeCharacter(characterId)
    return res.status(204).end()
  }
  return res.status(404).end()
}

const getFilters = ({ title, genre }) => {
  const filter = {}

  title
    ? filter.title = Sequelize.where(
      Sequelize.fn('LOWER', Sequelize.col('title')),
      'LIKE',
      `%${title.toLowerCase()}%`
    )
    : null
  genre ? filter.genreId = genre : null

  return filter
}


module.exports = {
  view,
  create,
  update,
  remove,
  asociateCharacter,
  desasociateCharacter,
}
