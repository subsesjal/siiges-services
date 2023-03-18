const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  deleteAndFindQuery,
  findOneQuery,
  findAllQuery,
  updateAndFindQuery,
} = queries;

const { Diligencia, Persona } = models;

module.exports = {
  createQuery: createQuery(Diligencia),
  deleteQuery: deleteAndFindQuery(Diligencia),
  findOneQuery: findOneQuery(Diligencia),
  findAllQuery: findAllQuery(Diligencia),
  updateQuery: updateAndFindQuery(Diligencia),
  updatePersonaQuery: updateAndFindQuery(Persona),
};
