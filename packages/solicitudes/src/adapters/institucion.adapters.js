const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  deleteAndFindQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

const { Institucion } = models;

module.exports = {
  create: createQuery(Institucion),
  delete: deleteAndFindQuery(Institucion),
  findOne: findOneQuery(Institucion),
  update: updateAndFindQuery(Institucion),
};
