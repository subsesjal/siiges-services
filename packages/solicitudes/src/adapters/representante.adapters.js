const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  deleteAndFindQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

const { Representante } = models;

module.exports = {
  create: createQuery(Representante),
  delete: deleteAndFindQuery(Representante),
  findOne: findOneQuery(Representante),
  update: updateAndFindQuery(Representante),
};
