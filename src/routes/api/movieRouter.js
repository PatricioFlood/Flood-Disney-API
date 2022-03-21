const movieRouter = require('express').Router()
const crudRouter = require('./crudRouter')
const uploadImageRouter = require('./uploadImageRouter')
const movieController = require('../../controllers/movieController')
const middleware = require('../../utils/middleware')
const Movie = require('../../models/Movie')

movieRouter.use(middleware.authentication)
movieRouter.use(crudRouter(movieController))
movieRouter.use(uploadImageRouter(Movie))
movieRouter.post('/:id/asociateCharacter', movieController.asociateCharacter)
movieRouter.delete('/:id/asociateCharacter/:characterId', movieController.desasociateCharacter)

module.exports = movieRouter

/**
 * 
 *  @openapi
 *  /movies:
 *    get:
 *      tags: [Movie]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Get all Movies or Filter Movies
 *      parameters:
 *      - name: title
 *        description: Search by title
 *        in: query
 *        schema:
 *          type: string
 *      - name: genre
 *        description: Filter by Genre ID
 *        in: query
 *        schema:
 *          type: integer
 *      - name: order
 *        description: Order Movies
 *        in: query
 *        schema:
 *          type: string
 *          enum: [ASC, DESC]
 *          
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/ShortMovie'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 */ 

/**
 *  @openapi
 *  /movies/{movieId}:
 *    get:
 *      tags: [Movie]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Get Movie by ID
 *      parameters:
 *      - name: movieId
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
 *                $ref: '#components/schemas/Movie'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 *        404:
 *          description: 'Error: Not Found'
 */     

/**
 * 
 *  @openapi
 *  /movies:
 *    post:
 *      tags: [Movie]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Create a new Movie
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Movie'
 *        required: true
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/Movie'
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
 *  /movies/{movieId}:
 *    put:
 *      tags: [Movie]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Update Movie by ID
 *      parameters:
 *      - name: movieId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Movie'
 *        required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/Movie'
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
 *  /movies/{movieId}:
 *    delete:
 *      tags: [Movie]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Delete Movie by ID
 *      parameters:
 *      - name: movieId
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
 *  /movies/{movieId}/uploadImage:
 *    post:
 *      tags: [Movie]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Upload Image to Movie by ID
 *      parameters:
 *      - name: movieId
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
 *                $ref: '#components/schemas/ShortMovie'
 *        400:
 *          $ref: '#components/responses/BadRequest'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 */    

/**
 * 
 *  @openapi
 *  /movies/{movieId}/asociateCharacter:
 *    post:
 *      tags: [Movie]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Asociate Character to Movie by ID
 *      parameters:
 *      - name: movieId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                  description: character ID
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/Movie'
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
 *  /movies/{movieId}/asociateCharacter/{characterId}:
 *    delete:
 *      tags: [Movie]
 *      security: 
 *      - jsonWebToken: []
 *      summary: Desasociate Character to Movie by Movie ID and Character ID
 *      parameters:
 *      - name: movieId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
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
 *                $ref: '#components/schemas/Movie'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 *        404:
 *          description: 'Error: Not Found'
 */