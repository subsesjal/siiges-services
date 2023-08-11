// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Notificacion,
} = models;

const {
  findOneQuery,
  findAllQuery,
  createQuery,
  deleteQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  findOneUserQuery: findOneQuery(Notificacion),
  findAllQuery: findAllQuery(Notificacion),
  createQuery: createQuery(Notificacion),
  deleteQuery: deleteQuery(Notificacion),
  updateUserQuery: updateAndFindQuery(Notificacion),
};
