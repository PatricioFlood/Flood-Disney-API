const { DataTypes } = require('sequelize')
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

/**
 *  @openapi
 *  components:
 *    schemas:
 *      ShortGenre:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            readOnly: true
 *            example: 1
 *          name:
 *            type: string
 *            example: Animated
 *          image:
 *            type: string
 *            readOnly: true
 *            example: https://flood-disney-api.s3.sa-east-1.amazonaws.com/genres/1-Animated.jpeg
 *        required: [id, name]
 *
 *      Genre:
 *        allOf:
 *        - $ref: '#components/schemas/ShortGenre'
 *        - type: object
 *          properties:
 *            movies:
 *              type: array
 *              readOnly: true
 *              items:
 *                type: object
 *                $ref: '#components/schemas/ShortMovie'
 */