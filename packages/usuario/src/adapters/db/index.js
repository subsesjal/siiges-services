// External dependencies
const { drivers, queries } = require('@siiges-services/core');

const { sequelize } = drivers;
const { Usuario } = sequelize.models;

const { findOneQuery } = queries;
const { findAllQuery } = queries;
const { createQuery } = queries;
const { deleteQuery } = queries;
const { updateQuery } = queries;

module.exports = {
  findOneQuery: findOneQuery(Usuario),
  findAllQuery: findAllQuery(Usuario),
  createQuery: createQuery(Usuario),
  deleteQuery: deleteQuery(Usuario),
  updateQuery: updateQuery(Usuario),
};
