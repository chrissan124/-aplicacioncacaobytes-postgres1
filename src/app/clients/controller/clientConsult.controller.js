const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (getClientsService, getClientService) => ({
  getAllClients: async (req, res, next) => {
    try {
      const result = await getClientsService.getClients(req.query)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  getClient: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await getClientService.getClient(id)
      if (result) res.send(result)
      else next(new NotFoundError(`Client ${id}`))
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api/clients')
  .get('', 'getAllClients')
  .get('/:id', 'getClient')