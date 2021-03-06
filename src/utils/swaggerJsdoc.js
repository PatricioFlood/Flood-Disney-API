const swaggerJsdoc = require('swagger-jsdoc')
const path = require('path')

const docsOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Flood-Disney-API',
      description: `API to explore the world of Disney, which allows knowing and modifying the
      characters that compose it and understand in which films they participated.\n
      Alkemy's Backend Challenge by Patricio Tomás Flood`,
      version: '1.0.0'
    },
  },
  apis: [
    path.join(__dirname, '../models/*.js'),
    path.join(__dirname, '../routes/api/*.js'),
    path.join(__dirname, '../middlewares/errorHandler.js')
  ],
}

const uiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customfavIcon: '/assets/favicon.ico',
  customSiteTitle: 'Flood Disney API - DOCS'
}

module.exports = {
  swaggerDocs: swaggerJsdoc(docsOptions),
  uiOptions
}