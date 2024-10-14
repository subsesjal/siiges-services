const solicitudesSchema = require('./schema');
const { solicitudesRevEquiv } = require('../../../adapters');

async function solicitudesRevEquivRouter(fastify, opts, next) {
  fastify.post(
    '/',
    {
      schema: solicitudesSchema.createEquivalenciaSchema,
    },
    solicitudesRevEquiv.createEquivalencia,
  );
  next();
}

module.exports = solicitudesRevEquivRouter;
