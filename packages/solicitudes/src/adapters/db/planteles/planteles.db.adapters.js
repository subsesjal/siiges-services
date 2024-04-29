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
  updateAndFindQuery,
  deleteAndFindQuery,
} = queries;

module.exports = {
  findOnePlantelQuery: findOneQuery(Plantel),
  findOneInstitucionQuery: findOneQuery(Institucion),
  findOneInfraestructuraQuery: findOneQuery(Infraestructura),
  createInfraestructuraQuery: createQuery(Infraestructura),
  updateInfraestructuraQuery: updateAndFindQuery(Infraestructura),
  deleteInfraestructuraQuery: deleteAndFindQuery(Infraestructura),
  createAsignaturaInfraestructuraQuery: createQuery(AsignaturaInfraestructura),
  findOneAsignaturaInfraestructuraQuery: findOneQuery(AsignaturaInfraestructura),
  findAllAsignaturaInfraestructuraQuery: findAllQuery(AsignaturaInfraestructura),
  deleteAsignaturaInfraestructuraQuery: deleteAndFindQuery(AsignaturaInfraestructura),
  findAllInfraestructuraQuery: findAllQuery(Infraestructura),
  findAllInfraestructuraProgramaQuery: findAllQuery(InfraestructuraPrograma),
  findOneInfraestructuraProgramaQuery: findOneQuery(InfraestructuraPrograma),
  createInfraestructuraProgramaQuery: createQuery(InfraestructuraPrograma),
};
