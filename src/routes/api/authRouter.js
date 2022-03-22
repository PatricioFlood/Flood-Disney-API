const authRouter = require('express').Router()
const authController = require('../../controllers/authController')

authRouter.post('/login', authController.login)
authRouter.post('/register', authController.register)

module.exports = authRouter

/**
 *
 *  @openapi
 *  /auth/register:
 *    post:
 *      tags: [Auth]
 *      summary: Register a new User
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *        required: true
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/User'
 *        400:
 *          $ref: '#components/responses/BadRequest'
 */

/**
 *
 *  @openapi
 *  /auth/login:
 *    post:
 *      tags: [Auth]
 *      summary: Login with Email and Password
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/LoginUser'
 *        required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#components/schemas/User'
 *        400:
 *          $ref: '#components/responses/BadRequest'
 */