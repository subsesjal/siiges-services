// Internal dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Usuario,
} = models;

const {
  findOneQuery,
  findAllQuery,
  createQuery,
  deleteQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  findOneUserQuery: findOneQuery(Usuario),
  findAllQuery: findAllQuery(Usuario),
  createQuery: createQuery(Usuario),
  deleteQuery: deleteQuery(Usuario),
  updateUserQuery: updateAndFindQuery(Usuario),
};
