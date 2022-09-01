// configs
const mysqlConfig = require('../config/config');

// drivers
const sequelize = require('./drivers/db/connection');

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
};
