const genreRouter = require('express').Router()
const crudRouter = require('./crudRouter')
const uploadImageRouter = require('./uploadImageRouter')
const genreController = require('../../controllers/genreController')
const middleware = require('../../middlewares/index')
const Genre = require('../../models/Genre')

genreRouter.use(middleware.authentication)
genreRouter.use(crudRouter(genreController))
genreRouter.use(uploadImageRouter(Genre))

module.exports = genreRouter

/**
 *
 *  @openapi
 *  /genres:
 *    get:
 *      tags: [Genre]
 *      security:
 *      - jsonWebToken: []
 *      summary: Get all Genres
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#components/schemas/ShortGenre'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 */

/**
 *  @openapi
 *  /genres/{genreId}:
 *    get:
 *      tags: [Genre]
 *      security:
 *      - jsonWebToken: []
 *      summary: Get Genre by ID
 *      parameters:
 *      - name: genreId
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
 *                $ref: '#components/schemas/Genre'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 *        404:
 *          description: 'Error: Not Found'
 */

/**
 *
 *  @openapi
 *  /genres:
 *    post:
 *      tags: [Genre]
 *      security:
 *      - jsonWebToken: []
 *      summary: Create a new Genre
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Genre'
 *        required: true
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/Genre'
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
 *  /genres/{genreId}:
 *    put:
 *      tags: [Genre]
 *      security:
 *      - jsonWebToken: []
 *      summary: Update Genre by ID
 *      parameters:
 *      - name: genreId
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Genre'
 *        required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/Genre'
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
 *  /genres/{genreId}:
 *    delete:
 *      tags: [Genre]
 *      security:
 *      - jsonWebToken: []
 *      summary: Delete Genre by ID
 *      parameters:
 *      - name: genreId
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
 *  /genres/{genreId}/uploadImage:
 *    post:
 *      tags: [Genre]
 *      security:
 *      - jsonWebToken: []
 *      summary: Upload Image to Genre by ID
 *      parameters:
 *      - name: genreId
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
 *                $ref: '#components/schemas/ShortGenre'
 *        400:
 *          $ref: '#components/responses/BadRequest'
 *        401:
 *          $ref: '#components/responses/Unauthorized'
 */