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

/**
 *  @openapi
 *  components:
 *    schemas:
 *      ShortMovie:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            readOnly: true
 *            example: 1
 *          image:
 *            type: string
 *            readOnly: true
 *            example: https://flood-disney-api.s3.sa-east-1.amazonaws.com/movies/1-Frozen.jpeg
 *          title:
 *            type: string
 *            example: Frozen
 *          creationDate:
 *            type: string
 *            format: date
 *            example: 2014-01-02
 *        required: [id, title]
 */

/**
 *  @openapi
 *  components:
 *    schemas:
 *      Movie:
 *        allOf:
 *        - $ref: '#components/schemas/ShortMovie'
 *        - type: object
 *          properties:
 *            calification:
 *              type: integer
 *              description: number from 1 to 5
 *              example: 5
 *            genreId:
 *              type: integer
 *              example: 1
 *              writeOnly: true
 *            genre:
 *              type: object
 *              $ref: '#components/schemas/ShortGenre'
 *              readOnly: true
 *            characters:
 *              type: array
 *              readOnly: true
 *              items:
 *                type: object
 *                $ref: '#components/schemas/ShortCharacter'
 */