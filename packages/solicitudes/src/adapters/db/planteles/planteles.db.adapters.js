// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Plantel,
  Infraestructura,
  InfraestructuraPrograma,
  AsignaturaInfraestructura,
  Institucion,
} = models;

const {
  createQuery,
  findOneQuery,
  findAllQuery,
  deleteAndFindQuery,
} = queries;

module.exports = {
  findOnePlantelQuery: findOneQuery(Plantel),
  findOneInstitucionQuery: findOneQuery(Institucion),
  findOneInfraestructuraQuery: findOneQuery(Infraestructura),
  createInfraestructuraQuery: createQuery(Infraestructura),
  deleteInfraestructuraQuery: deleteAndFindQuery(Infraestructura),
  createAsignaturaInfraestructuraQuery: createQuery(AsignaturaInfraestructura),
  findAllInfraestructuraQuery: findAllQuery(Infraestructura),
  findAllInfraestructuraProgramaQuery: findAllQuery(InfraestructuraPrograma),
  createInfraestructuraProgramaQuery: createQuery(InfraestructuraPrograma),
};
