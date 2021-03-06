const { Op } = require('sequelize')

const prepareQuery = (options = {}) => {
  const pagination = paginateRequest(options)
  const conditions = setConditions(options)
  const sort = setSort(options)
  return {
    ...pagination,
    conditions: {
      ...conditions,
      ...(options.deleted === 'only' && { deletedAt: { [Op.not]: null } }),
    },
    order: sort,
    raw: options.raw,
    nest: options.raw && true,
    ...(options.attr && { attributes: options.attr }),
    ...(options.exclude && { exclude: options.exclude }),
  }
}

const paginateRequest = (options = {}) => {
  //Set pagination
  const { size, page, deleted } = options
  const limit = size ? +size : undefined
  const offset = page ? page * limit : 0

  return {
    limit,
    offset,
    deleted: deleted === 'true' || deleted === 'only',
  }
}

function setConditions(options = {}) {
  //Set filter conditions
  const conditions = {}
  const notConditions = [
    'page',
    'size',
    'deleted',
    'sort',
    'include',
    'exclude',
    'attr',
  ]
  for (let [key, value] of Object.entries(options)) {
    if (!notConditions.includes(key)) {
      let values =
        typeof value === 'string' &&
        !(key.endsWith('Id') || key.endsWith('Fk') || key.endsWith('$'))
          ? value.replace('-', ' ').split(',')
          : value
      if (typeof values === 'object' && !Array.isArray(values)) {
        for (let [nestedKey, nestedValue] of Object.entries(values)) {
          delete values[nestedKey]
          values[Op[nestedKey]] = nestedValue
        }
      }
      conditions[key] = values
    }
  }
  return conditions
}

/*
  order query structure:
  sort=<attribute>:<sort direction>

  sort directions: 
    -a:ascendent
    -d:descendent
    -nf:nulls first
    -nl:nulls last

*/
function setSort(options = {}) {
  const { sort } = options
  const sortSet = []
  if (typeof sort === 'string') {
    const sortParams = sort.split(',')
    sortParams.forEach((param) => {
      let [attr, dir] = param.split(':')
      switch (dir) {
        case 'a':
          dir = 'ASC'
          break
        case 'd':
          dir = 'DESC'
          break
        case 'nf':
          dir = 'NULLS FIRST'
          break
        case 'nl':
          dir = 'NULLS LAST'
          break
        default:
          dir = 'ASC'
      }
      sortSet.push([attr, dir])
    })
  }
  return sortSet
}

module.exports = prepareQuery
