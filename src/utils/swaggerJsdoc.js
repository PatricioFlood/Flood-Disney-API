const swaggerJsdoc = require('swagger-jsdoc')
const path = require('path')

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Flood-Disney-API',
      version: '1.0.0',
    },
  },
  apis: [
    path.join(__dirname, '../models/*.js'),
    path.join(__dirname, '../routes/api/*.js'),
    path.join(__dirname, './middleware.js')
  ],
};

module.exports = swaggerJsdoc(options);