// External dependencies
const { drivers, queries } = require('@siiges-services/core');

const { Institucion } = drivers.sequelize.models;

const {
  findOneQuery,
  findAllQuery,
  createQuery,
  deleteQuery,
  updateQuery,
} = queries;

module.exports = {
  findOneInstitucionQuery: findOneQuery(Institucion),
  findAllInstitucionesQuery: findAllQuery(Institucion),
  createQuery: createQuery(Institucion),
  deleteQuery: deleteQuery(Institucion),
  updateQuery: updateQuery(Institucion),
};
