const { models, queries } = require('@siiges-services/core');

const {
  Institucion,
  Periodo,
  Sesion,
  PresupuestoEgreso,
  Presupuesto,
  TipoPresupuesto,
  TipoRecursoPresupuesto,
  TipoEgreso,
} = models;

const {
  createQuery,
  findOneQuery,
  findAllQuery,
  updateAndFindQuery,
  deleteAndFindQuery,
} = queries;

module.exports = {
  // Create
  createPresupuestoEgresoQuery: createQuery(PresupuestoEgreso),
  createPresupuestoQuery: createQuery(Presupuesto),
  // Update
  updatePresupuestoEgresoQuery: updateAndFindQuery(PresupuestoEgreso),
  updatePresupuestoQuery: updateAndFindQuery(Presupuesto),
  // Delete
  deletePresupuestoEgresoQuery: deleteAndFindQuery(PresupuestoEgreso),
  deletePresupuestoQuery: deleteAndFindQuery(Presupuesto),
  // Find all
  findAllPresupuestoEgresoQuery: findAllQuery(PresupuestoEgreso),
  findAllPresupuestoQuery: findAllQuery(Presupuesto),
  // find one validators
  findOneTipoRecursoPresupuestoQuery: findOneQuery(TipoRecursoPresupuesto),
  findOneTipoPresupuestoQuery: findOneQuery(TipoPresupuesto),
  findOneInstitucionQuery: findOneQuery(Institucion),
  findOneTipoEgresoQuery: findOneQuery(TipoEgreso),
  findOnePeriodoQuery: findOneQuery(Periodo),
  findOneSesionQuery: findOneQuery(Sesion),
  // find one
  findOnePresupuestoEgresoQuery: findOneQuery(PresupuestoEgreso),
  findOnePresupuestoQuery: findOneQuery(Presupuesto),
};
