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

} = queries;

module.exports = {
  findOnePlantelQuery: findOneQuery(Plantel),
  findOneInstitucionQuery: findOneQuery(Institucion),
  createInfraestructuraQuery: createQuery(Infraestructura),
  createInfraestructuraProgramaQuery: createQuery(InfraestructuraPrograma),
  createAsignaturaInfraestructuraQuery: createQuery(AsignaturaInfraestructura),
  findAllInfraestructuraQuery: findAllQuery(Infraestructura),
};
