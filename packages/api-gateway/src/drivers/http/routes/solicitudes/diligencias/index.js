const { diligenceAdapter } = require('../../../adapters');
const { findOneSchema, createSchema } = require('./schema');

async function diligenceRouter(fastify, _, next) {
  await fastify.post(
    '/',
    { schema: createSchema },
    diligenceAdapter.create,
  );

  await fastify.get(
    '/:diligenceId',
    { schema: findOneSchema },
    diligenceAdapter.findOne,
  );

  await fastify.patch(
    '/:diligenceId',
    diligenceAdapter.update,
  );

  await fastify.delete(
    '/:diligenceId',
    diligenceAdapter.deleteOne,
  );

  next();
}

module.exports = diligenceRouter;
