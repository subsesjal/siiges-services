const { createPresupuesto } = require('./create.handlers.presupuesto-egreso.adapter');
const { deletePresupuesto } = require('./delete.handlers.presupuesto-egreso.adapter');
const { findAllPresupuesto } = require('./find-all.handlers.presupuesto-egreso.adapter');
const { findOnePresupuesto } = require('./find-one.handlers.presupuesto-egreso.adapter');
const { updatePresupuesto } = require('./update.handlers.presupuesto-egreso.adapter');

module.exports = {
  createPresupuesto,
  deletePresupuesto,
  findAllPresupuesto,
  findOnePresupuesto,
  updatePresupuesto,
};
