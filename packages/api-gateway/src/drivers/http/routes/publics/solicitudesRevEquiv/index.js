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
  fastify.get(
    '/:equivalenciaId',
    {
      schema: solicitudesSchema.findOneEquivalenciaSchema,
    },
    solicitudesRevEquiv.findOneEquivalencia,
  );
  fastify.get(
    '/equivalencias',
    {
      schema: solicitudesSchema.findAllEquivalenciasSchema,
    },
    solicitudesRevEquiv.findAllEquivalencias,
  );
  await fastify.delete(
    '/:equivalenciaId',
    {
      schema: solicitudesSchema.deleteEquivalenciaSchema,
    },
    solicitudesRevEquiv.deleteEquivalencia,
  );
  next();
}

module.exports = solicitudesRevEquivRouter;
