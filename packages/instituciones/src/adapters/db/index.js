// External dependencies
const { drivers, queries } = require('@siiges-services/core');

const { Institucion } = drivers.sequelize.models;
const { Plantel } = drivers.sequelize.models;
const { Domicilio } = drivers.sequelize.models;
const { RatificacionNombre } = drivers.sequelize.models;

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
  deleteInstitucionQuery: deleteQuery(Institucion),
  findOnePlantelQuery: findOneQuery(Plantel),
  createPlantelQuery: createQuery(Plantel),
  updatePlantelQuery: updateQuery(Plantel),
  deletePlantelQuery: deleteQuery(Plantel),
  updateDomicilioQuery: updateQuery(Domicilio),
  createRatificacionQuery: createQuery(RatificacionNombre),
  updateRatificacionQuery: updateQuery(RatificacionNombre),
};
