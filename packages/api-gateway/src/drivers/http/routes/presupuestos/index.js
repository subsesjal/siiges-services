const { presupuestosAdapter } = require('../../adapters');
const {
  createPresupuestoSchema,
  findOnePresupuestoSchema,
  findAllPresupuestoSchema,
  updatePresupuestoSchema,
} = require('./schema');

async function presupuestosRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createPresupuestoSchema,
      onRequest: [fastify.authenticate],
    },
    presupuestosAdapter.createPresupuesto,
  );

  await fastify.get(
    '/presupuestoEgresos/:presupuestoEgresoId',
    {
      schema: findOnePresupuestoSchema,
      onRequest: [fastify.authenticate],
    },
    presupuestosAdapter.findOnePresupuesto,
  );

  await fastify.patch(
    '/presupuestoEgresos/:presupuestoEgresoId',
    {
      schema: updatePresupuestoSchema,
      onRequest: [fastify.authenticate],
    },
    presupuestosAdapter.updatePresupuesto,
  );

  await fastify.get(
    '/instituciones/:institucionId',
    {
      schema: findAllPresupuestoSchema,
      onRequest: [fastify.authenticate],
    },
    presupuestosAdapter.findAllPresupuesto,
  );

  next();
}

module.exports = presupuestosRouter;
