// External dependencies
const { drivers, queries } = require('@siiges-services/core');

const { Usuario } = drivers.sequelize.models;

const {
  findOneQuery,
  findAllQuery,
  createQuery,
  deleteQuery,
  updateQuery,
} = queries;

module.exports = {
  findOneQuery: findOneQuery(Usuario),
  findAllQuery: findAllQuery(Usuario),
  createQuery: createQuery(Usuario),
  deleteQuery: deleteQuery(Usuario),
  updateQuery: updateQuery(Usuario),
};
