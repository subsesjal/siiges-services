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
  createInfraestructuraProgramaQuery: createQuery(InfraestructuraPrograma),
  createAsignaturaInfraestructuraQuery: createQuery(AsignaturaInfraestructura),
  findAllInfraestructuraQuery: findAllQuery(Infraestructura),
};
