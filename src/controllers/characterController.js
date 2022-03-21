const { Character, Movie } = require('../models/index')
const { Sequelize } = require('sequelize');
const uploadImageController = require('./uploadImageController')

const view = async (req, res) => {
  const id = req.params.id
  if(id){
    const character = await Character
      .findByPk(id, { 
        include: { 
          model: Movie, 
          through: { attributes: [] },
          attributes: ['id', 'title', 'image', 'creationDate'],
        } 
      })
    if(character)
      return res.json(character)
    return res.status(404).end()
  } 

  const filter = getFilters(req.query)

  let characters = await Character
    .findAll({
      include: Movie,
      attributes: ['id', 'image', 'name'],
      where: filter
    })

  if(req.query.movies){
    characters = characters.filter(
      char => char.movies.find(
        movie => movie.id === Number(req.query.movies)
      ) 
    )
  }

  characters = characters.map(({id, image, name}) => ({id, image, name}))

  return res.json(characters)
}


const create = async (req, res) => {
  delete req.body.id
  delete req.body.image

  const character = await Character.create(req.body)

  return res.status(201).json(character)
}

const update = async (req, res) => {
  const id = req.params.id
  delete req.body.id
  delete req.body.image

  const character = await Character.findByPk(id)
  if(character){
    character.set(req.body)
    await character.save()
    return res.json(character)
  }

  return res.status(404).end()
} 

const remove = async (req, res) => {
  const id = req.params.id
  const character = await Character.findByPk(id)
  if(character){
    if(character.image)
      await uploadImageController.deleteImage(character.image)

    await character.destroy()
  }
  return res.status(204).end()
}

const getFilters = ({ name, age, weight }) => {
  const filter = {}

  name 
    ? filter.name = Sequelize.where(
      Sequelize.fn('LOWER', Sequelize.col('name')), 
      'LIKE', 
      `%${name.toLowerCase()}%`
    )
    : null
  age ? filter.age = age : null
  weight ? filter.weight = weight : null

  return filter
}

module.exports = {
  view,
  create,
  update,
  remove,
}

