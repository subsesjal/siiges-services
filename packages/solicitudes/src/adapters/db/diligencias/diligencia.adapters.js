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
  createQuery: createQuery(Diligencia),
  deleteQuery: deleteAndFindQuery(Diligencia),
  findOneQuery: findOneQuery(Diligencia),
  findAllQuery: findAllQuery(Diligencia),
  updateQuery: updateQuery(Diligencia),
};
