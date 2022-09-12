// Internal dependencies
const mysqlConfig = require('../config/config');
const sequelize = require('./drivers/db/connection');
const dbAdapters = require('./adapters/db');

module.exports = {
  configs: {
    mysqlConfig,
  },
  models: {
    ...sequelize.models,
  },
  drivers: {
    sequelize,
  },
  queries: { ...dbAdapters },
};
