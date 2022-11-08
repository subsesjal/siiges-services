const { models, queries } = require('@siiges-services/core');

const { Rol } = models;
const {
  createQuery,
  findOneQuery,
  deleteAndFindQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  createQuery: createQuery(Rol),
  findOneQuery: findOneQuery(Rol),
  deleteQuery: deleteAndFindQuery(Rol),
  updateQuery: updateAndFindQuery(Rol),
};
