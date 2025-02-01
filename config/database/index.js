const knex = require('knex')
const config = require('../environment/config')

const dbconnect = knex(config.knex)

module.exports = dbconnect
