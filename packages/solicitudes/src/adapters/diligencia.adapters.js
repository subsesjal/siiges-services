const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  deleteAndFindQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

const { Diligencia } = models;

module.exports = {
  create: createQuery(Diligencia),
  delete: deleteAndFindQuery(Diligencia),
  findOne: findOneQuery(Diligencia),
  update: updateAndFindQuery(Diligencia),
};
