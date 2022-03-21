const characterRouter = require('express').Router()
const crudRouter = require('./crudRouter')
const uploadImageRouter = require('./uploadImageRouter')
const characterController = require('../../controllers/characterController')
const middleware = require('../../utils/middleware')
const Character = require('../../models/Character')

characterRouter.use(middleware.authentication)
characterRouter.use(crudRouter(characterController))
characterRouter.use(uploadImageRouter(Character))

module.exports = characterRouter

/**
 * 
 *  @openapi
 *  /characters:
 *    get:
 *      tags: [Character]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Get all Characters or Filter Characters
 *      parameters:
 *      - name: name
 *        description: Search by name
 *        in: query
 *        schema:
 *          type: string
 *      - name: age
 *        description: Filter by age
 *        in: query
 *        schema:
 *          type: integer
 *      - name: movies
 *        description: Filter by movie (movie ID) in which the Character participates
 *        in: query
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/ShortCharacter'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 */ 

/**
 *  @openapi
 *  /characters/{characterId}:
 *    get:
 *      tags: [Character]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Get Character by ID
 *      parameters:
 *      - name: characterId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/Character'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 *        404:
 *          description: 'Error: Not Found'
 */     

/**
 * 
 *  @openapi
 *  /characters:
 *    post:
 *      tags: [Character]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Create a new Character
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Character'
 *        required: true
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/Character'
 *        400:
 *          $ref: '#components/responses/BadRequest'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 *        404:
 *          description: 'Error: Not Found'
 */     

/**
 * 
 *  @openapi
 *  /characters/{characterId}:
 *    put:
 *      tags: [Character]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Update Character by ID
 *      parameters:
 *      - name: characterId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Character'
 *        required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/Character'
 *        400:
 *          $ref: '#components/responses/BadRequest'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 *        404:
 *          description: 'Error: Not Found'
 */     

/**
 * 
 *  @openapi
 *  /characters/{characterId}:
 *    delete:
 *      tags: [Character]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Delete Character by ID
 *      parameters:
 *      - name: characterId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        204:
 *          description: No Content
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 */    

/**
 * 
 *  @openapi
 *  /characters/{characterId}/uploadImage:
 *    post:
 *      tags: [Character]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Upload Image to Character by ID
 *      parameters:
 *      - name: characterId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                image:
 *                  type: string
 *                  format: binary
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/ShortCharacter'
 *        400:
 *          $ref: '#components/responses/BadRequest'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 */    