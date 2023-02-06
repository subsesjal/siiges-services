const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  deleteAndFindQuery,
  findOneQuery,
  updateQuery,
} = queries;

const { Representante } = models;

module.exports = {
  create: createQuery(Representante),
  delete: deleteAndFindQuery(Representante),
  findOne: findOneQuery(Representante),
  update: updateQuery(Representante),
};
