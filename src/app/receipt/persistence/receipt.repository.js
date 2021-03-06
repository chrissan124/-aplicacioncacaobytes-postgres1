const findAssociations = require('../../common/persistence/sequilize/findAssociations')
const prepareQuery = require('../../common/persistence/sequilize/prepareQuery')
const SequelizeRepo = require('../../common/persistence/sequilize/sequelizeRepo')
const statuses = require('../../common/persistence/status/statuses')

module.exports = class receiptRepository extends SequelizeRepo {
  constructor(apiDb) {
    super(apiDb.models.Receipt, apiDb, statuses.PENDING_REVIEW)
  }
}
