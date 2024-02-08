const { models, queries } = require('@siiges-services/core');

const {
  PlanMaestro,
  Proyecto,
  ResponsablePlaneacion,
  ResponsableObra,
  Institucion,
  Periodo,
  Sesion,
  ProyectoEspacio,
  TipoProyecto,
  ProyectoTipoProyecto,
  Contrato,
} = models;

const {
  createQuery,
  findOneQuery,
  findAllQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  createPlanMaestroQuery: createQuery(PlanMaestro),
  createProyectoQuery: createQuery(Proyecto),
  createResponsablePlaneacionQuery: createQuery(ResponsablePlaneacion),
  createResponsableObraQuery: createQuery(ResponsableObra),
  createProyectoEspacioQuery: createQuery(ProyectoEspacio),
  createTipoProyectoQuery: createQuery(ProyectoTipoProyecto),
  createContratoQuery: createQuery(Contrato),
  updateProyecto: updateAndFindQuery(Proyecto),
  findAllProyectoQuery: findAllQuery(Proyecto),
  findOnePlanMaestroQuery: findOneQuery(PlanMaestro),
  findAllPlanMaestroQuery: findAllQuery(PlanMaestro),
  findOneResponsablePlaneacionQuery: findOneQuery(ResponsablePlaneacion),
  findOneInstitucionQuery: findOneQuery(Institucion),
  findOnePeriodoQuery: findOneQuery(Periodo),
  findOneSesionQuery: findOneQuery(Sesion),
  findOneTipoProyectoQuery: findOneQuery(TipoProyecto),
};
