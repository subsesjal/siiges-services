const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  deleteAndFindQuery,
  findOneQuery,
  findAllQuery,
  updateQuery,
} = queries;

const { Diligencia } = models;

module.exports = {
  create: createQuery(Diligencia),
  delete: deleteAndFindQuery(Diligencia),
  findOne: findOneQuery(Diligencia),
  findAll: findAllQuery(Diligencia),
  update: updateQuery(Diligencia),
};
