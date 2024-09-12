const { createPresupuestoSchema } = require('./create.presupuesto-egresos.schema');
// const {} = require('./delete.presupuesto-egresos.schema');
const { findAllPresupuestoSchema } = require('./find-all.presupuesto-egresos.schema');
const { findOnePresupuestoSchema } = require('./find-one.presupuesto-egresos.schema');
const { updatePresupuestoSchema } = require('./update.presupuesto-egresos.schema');

module.exports = {
  createPresupuestoSchema,
  findOnePresupuestoSchema,
  findAllPresupuestoSchema,
  updatePresupuestoSchema,
};
