// Drivers
const { drivers } = require('@siiges-services/core');

const { sequelize } = drivers;

// Domains
const {
  findOneByParamsQuery,
  createQuery,
  updateQuery,
  deleteQuery,
} = require('./files');

// define the target model
const fileModel = sequelize.model('File');

module.exports = {
  findOneByParamsQuery: findOneByParamsQuery(fileModel),
  createQuery: createQuery(fileModel),
  updateQuery: updateQuery(fileModel),
  deleteQuery: deleteQuery(fileModel),
};
