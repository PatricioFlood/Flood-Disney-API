const crudRouter = (controller) => {
  const router = require('express').Router()

  router.get('/(:id)?', controller.view)
  router.post('/', controller.create)
  router.put('/:id', controller.update)
  router.delete('/:id', controller.remove)

  return router
} 

module.exports = crudRouter