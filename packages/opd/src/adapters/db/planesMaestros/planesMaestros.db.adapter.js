const { models, queries } = require('@siiges-services/core');

const {
  PlanMaestro,
  DatosDelProyecto,
  Planeacion,
  ObraYMantenimiento,
  Institucion,
  Periodo,
  Sesion,
  EspacioDeEquipamento,
  TipoDeProyecto,
  ContratoYCalendario,
} = models;

const {
  createQuery,
  findOneQuery,
  findAllQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  createPlanMaestroQuery: createQuery(PlanMaestro),
  createDatosDelProyectoQuery: createQuery(DatosDelProyecto),
  createPlaneacionQuery: createQuery(Planeacion),
  createObraYMantenimientoQuery: createQuery(ObraYMantenimiento),
  createEspacioDeEquipamentoQuery: createQuery(EspacioDeEquipamento),
  createTipoDeProyectoQuery: createQuery(TipoDeProyecto),
  createContratoYCalendarioQuery: createQuery(ContratoYCalendario),
  updateDatosDelProyecto: updateAndFindQuery(DatosDelProyecto),
  findAllDatosDelProyectoQuery: findAllQuery(DatosDelProyecto),
  findOnePlanMaestroQuery: findOneQuery(PlanMaestro),
  findAllPlanMaestroQuery: findAllQuery(PlanMaestro),
  findOnePlaneacionQuery: findOneQuery(Planeacion),
  findOneInstitucionQuery: findOneQuery(Institucion),
  findOnePeriodoQuery: findOneQuery(Periodo),
  findOneSesionQuery: findOneQuery(Sesion),
};
