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

/**
 *  @openapi
 *  components:
 *    schemas:
 *      ShortCharacter:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            readOnly: true
 *            example: 1
 *          image:
 *            type: string
 *            readOnly: true
 *            example: https://flood-disney-api.s3.sa-east-1.amazonaws.com/characters/1b7b3ab7-2238-4a4d-80d5-aea10912a36f.jpeg
 *          name: 
 *            type: string
 *            example: Pluto
 *        required: [id, name]
 */

/**
 *  @openapi
 *  components:
 *    schemas:
 *      Character:
 *        allOf:
 *        - $ref: '#components/schemas/ShortCharacter'
 *        - type: object
 *          properties:
 *            age:
 *              type: integer
 *              example: 28
 *            weight:
 *              type: integer
 *              example: 40
 *            history: 
 *              type: string
 *              example: He is a yellow-orange color, medium-sized, short-haired dog with black ears. Unlike most Disney characters, Pluto is not anthropomorphic beyond some characteristics such as facial expression. He is Mickey's pet.
 *            movies:
 *                type: array
 *                readOnly: true
 *                items:
 *                  type: object
 *                  $ref: '#components/schemas/ShortMovie'
 */