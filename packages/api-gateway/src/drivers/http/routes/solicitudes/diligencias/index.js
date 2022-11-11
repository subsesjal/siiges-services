const { diligenceAdapter } = require('../../../adapters');
const {
  createSchema,
  deleteSchema,
  findOneSchema,
  updateSchema,
} = require('./schema');

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
    { schema: updateSchema },
    diligenceAdapter.update,
  );

  await fastify.delete(
    '/:diligenceId',
    { schema: deleteSchema },
    diligenceAdapter.deleteOne,
  );

  next();
}

module.exports = diligenceRouter;
