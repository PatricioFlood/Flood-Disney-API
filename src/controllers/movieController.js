const { Movie, Character } = require('../models/index')

const getFilters = ({ name, age, weight }) => {
  const filter = {}

  name ? filter.name = {
    [Op.like]: name
  } : null
  age ? filter.age = age : null
  weight ? filter.weight = weight : null

  return filter
}

const view = async (req, res) => {
  const id = req.params.id
  if(id){
    const movie = await Movie
      .findByPk(id, { include: Character })
    if(movie)
      return res.json(movie)
    return res.status(404).end()
  } 

  const filter = getFilters(req.query)

  let movies = await Movie
    .findAll({
      attributes: ['id', 'image', 'title', 'creationDate'],
      where: filter
    })

  return res.json(movies)
}

const create = async (req, res) => {
  delete req.body.id

  const movie = await Movie.create(req.body)
  const characters = req.body.characters

  if(characters) 
    await Promise.all(characters.map(async character => {
      await movie.addCharacter(character.id)
    }))

  const createdMovie = await Movie.findByPk(movie.id, { include: Character } ) 
  return res.status(201).json(createdMovie)
}

const update = async (req, res) => {
  const id = req.params.id
  delete req.body.id

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
    console.log(movie.toJSON())
    await movie.destroy()
    return res.status(204).end()
  }
  return res.status(404).end()
}


module.exports = {
  view,
  create,
  update,
  remove
}
