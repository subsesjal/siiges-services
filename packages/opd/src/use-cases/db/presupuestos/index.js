const { presupuestos } = require('../../../adapters/db');

const { createPresupuesto } = require('./create.presupuesto-egreso.use-case');
const { findOnePresupuesto: findOnePresupuestoQuery } = require('./find-one.presupuesto-egreso.use-case');
const { findAllPresupuesto } = require('./find-all.presupuesto-egreso.use-case');
const { updatePresupuesto } = require('./update.presupuesto-egreso.use-case');

const findOnePresupuesto = findOnePresupuestoQuery(
  presupuestos.findOnePresupuestoEgresoQuery,
  presupuestos.findAllPresupuestoQuery,
);

module.exports = {
  createPresupuesto: createPresupuesto(
    presupuestos.findOneInstitucionQuery,
    presupuestos.findOnePeriodoQuery,
    presupuestos.findOneSesionQuery,
    presupuestos.findOneTipoEgresoQuery,
    presupuestos.findOneTipoPresupuestoQuery,
    presupuestos.findOneTipoRecursoPresupuestoQuery,
    presupuestos.createPresupuestoEgresoQuery,
    presupuestos.createPresupuestoQuery,
    presupuestos.findOnePresupuestoEgresoQuery,
  ),
  findOnePresupuesto,
  findAllPresupuesto: findAllPresupuesto(
    presupuestos.findAllPresupuestoEgresoQuery,
  ),
  updatePresupuesto: updatePresupuesto(
    presupuestos.findOneTipoEgresoQuery,
    presupuestos.findOneTipoPresupuestoQuery,
    presupuestos.findOneTipoRecursoPresupuestoQuery,
    presupuestos.findOnePresupuestoQuery,
    presupuestos.createPresupuestoQuery,
    presupuestos.updatePresupuestoQuery,
    findOnePresupuesto,
  ),
};
