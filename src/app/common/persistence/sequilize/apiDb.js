const Sequilize = require('sequelize')
const dotenv = require('dotenv')
const glob = require('glob')
const { resolve } = require('path')
const logger = require('../../controllers/logger/logger')
dotenv.config()

function configDb() {
  try {
    //Create connection pool to db
    const apiDb = new Sequilize(
      process.env.POSTGRES_DB_NAME,
      process.env.POSTGRES_DB_USER,
      process.env.POSTGRES_DB_PASS,
      {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        },
        host: process.env.POSTGRES_DB_HOST,
        logging:
          process.env.POSTGRES_DB_LOGGING === 'true' ? console.log : false,
      }
    )
    //Use global pattern to load all database models automatically

    const files = glob.sync(`${resolve('src')}/**/*.model.js`)
    files.forEach((file) => {
      const modelFunction = require(file)
      const model = modelFunction(apiDb)
    })
    //After all models are loaded, resolve associations between them
    const setupFiles = glob.sync(`${resolve('src')}/**/*.model.setup.js`)
    setupFiles.forEach((file) => {
      const setupFunction = require(file)
      setupFunction(apiDb)
    })
    return apiDb
  } catch (error) {
    logger.error(`Error connecting to sql database [${error.message}]`)
  }
}

module.exports = configDb()
