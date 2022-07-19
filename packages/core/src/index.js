// configs
const mysqlConfig = require('../config/mysql');

// drivers
const sequelize = require('./drivers/mysql/connection');

// utils
// const enviroment = require("./utils/environment");

module.exports = {
  configs: {
    mysqlConfig,
  },
  drivers: {
    sequelize,
  },
  /* utils: {
    enviroment,
  }, */
};
