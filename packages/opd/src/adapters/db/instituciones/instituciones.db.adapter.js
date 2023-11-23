const { models, queries } = require('@siiges-services/core');

const {
  Institucion,
} = models;

const {
  findOneQuery,
} = queries;

module.exports = {
  findOneInstitucionQuery: findOneQuery(Institucion),
};
