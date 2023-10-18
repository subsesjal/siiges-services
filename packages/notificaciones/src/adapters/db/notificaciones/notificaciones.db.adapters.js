// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Notificacion,
} = models;

const {
  findOneQuery,
  findAllQuery,
  createQuery,
  deleteAndFindQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  findOneUserQuery: findOneQuery(Notificacion),
  findAllQuery: findAllQuery(Notificacion),
  createQuery: createQuery(Notificacion),
  deleteQuery: deleteAndFindQuery(Notificacion),
  updateUserQuery: updateAndFindQuery(Notificacion),
  findOneNotificationQuery: findOneQuery(Notificacion),
};
