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
  createInstitucionQuery: createQuery(Institucion),
  updateInstitucionQuery: updateQuery(Institucion),
  deleteQuery: deleteQuery(Institucion),
};
