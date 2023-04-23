// External dependencies
const { drivers, queries } = require('@siiges-services/core');

const {
  Institucion,
  Plantel,
  Domicilio,
  RatificacionNombre,
  Director,
  Persona,
  Municipio,
  PlantelHigiene,
  PlantelInfraestructura,
  Higiene,
} = drivers.sequelize.models;

const {
  findOneQuery,
  findAllQuery,
  createQuery,
  deleteQuery,
  updateQuery,
  updateAndFindQuery,
  deleteAndFindQuery,
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
  findOneRatificacionQuery: findOneQuery(RatificacionNombre),
  createRatificacionQuery: createQuery(RatificacionNombre),
  updateRatificacionQuery: updateQuery(RatificacionNombre),
  deleteRatificacionQuery: deleteQuery(RatificacionNombre),
  findOneDirectorQuery: findOneQuery(Director),
  createDirectorQuery: createQuery(Director),
  updatePersonaQuery: updateQuery(Persona),
  updateDirectorQuery: updateQuery(Director),
  findAllMunicipiosQuery: findAllQuery(Municipio),
  createHigieneQuery: createQuery(PlantelHigiene),
  updateHigieneQuery: updateAndFindQuery(PlantelHigiene),
  deleteHigieneQuery: deleteAndFindQuery(PlantelHigiene),
  findOnePlantelHigieneQuery: findOneQuery(PlantelHigiene),
  findAllHigienesQuery: findAllQuery(Higiene),
  findGroupPlantelHigieneQuery: findAllQuery(PlantelHigiene),
  findPlantelInfraestructuraQuery: findAllQuery(PlantelInfraestructura),
};
