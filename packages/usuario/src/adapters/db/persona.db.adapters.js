const { models, queries } = require('@siiges-services/core');

const { Persona } = models;
const {
  createQuery,
  deleteAndFindQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  createQuery: createQuery(Persona),
  deleteQuery: deleteAndFindQuery(Persona),
  findOneQuery: findOneQuery(Persona),
  updateQuery: updateAndFindQuery(Persona),
};
