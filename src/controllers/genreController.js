const { Genre, Movie } = require('../models/index')

const view = async (req, res) => {
  const id = req.params.id

  if(id){
    const genre = await Genre
      .findByPk(id, { include: Movie })
    if(genre)
      return res.json(genre)
    return res.status(404).end()
  } 

  const genres = await Genre.findAll()

  return res.json(genres)
}

const create = async (req, res) => {
  delete req.body.id

  const genre = await Genre.create(req.body)

  return res.status(201).json(genre)
}

const update = async (req, res) => {
  const id = req.params.id
  delete req.body.id

  const genre = await Genre.findByPk(id)
  if(genre){
    genre.set(req.body)
    await genre.save()
    return res.json(genre)
  }
  return res.status(404).end()
}

const remove = async (req, res) => {
  const id = req.params.id
  const genre = await Genre.findByPk(id)
  if(genre){
    await genre.destroy()
  }
  return res.status(404).end()
}

module.exports = {
  view,
  create,
  update,
  remove
}

