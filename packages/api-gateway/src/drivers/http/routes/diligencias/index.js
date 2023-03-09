const { diligenciasAdapter } = require('../../adapters');
const {
  createDiligenciaSchema,
  findOneDiligenciaSchema,
  updateDiligenciaSchema,
  deleteDiligenciaSchema,
} = require('./schema');

async function diligenciasRouter(fastify, _, next) {
  await fastify.get(
    '/:diligenceId',
    { schema: findOneDiligenciaSchema },
    diligenciasAdapter.findOneDiligencia,
  );

  await fastify.post(
    '/',
    { schema: createDiligenciaSchema },
    diligenciasAdapter.createDiligencia,
  );

  await fastify.patch(
    '/:diligenceId',
    { schema: updateDiligenciaSchema },
    diligenciasAdapter.updateDiligencia,
  );

  await fastify.delete(
    '/:diligenceId',
    { schema: deleteDiligenciaSchema },
    diligenciasAdapter.deleteDiligencia,
  );

  next();
}

module.exports = diligenciasRouter;
