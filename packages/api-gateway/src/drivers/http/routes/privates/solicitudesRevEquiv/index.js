const solicitudesSchema = require('./schema');
const { solicitudesRevEquiv } = require('../../../adapters');

async function solicitudesRevEquivRouter(fastify, opts, next) {
  await fastify.patch(
    '/:solicitudRevEquivId',
    {
      schema: solicitudesSchema.updateEquivalenciaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesRevEquiv.findOneEquivalencia,
  );

  await fastify.get(
    '/',
    {
      schema: solicitudesSchema.findAllEquivalenciasSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesRevEquiv.findAllEquivalencias,
  );

  await fastify.get(
    '/:solicitudRevEquivId',
    {
      schema: solicitudesSchema.findOneEquivalenciaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesRevEquiv.findOneEquivalencia,
  );

  await fastify.delete(
    '/:solicitudRevEquivId',
    {
      schema: solicitudesSchema.deleteEquivalenciaSchema,
      onRequest: [fastify.authenticate],
    },
    solicitudesRevEquiv.deleteEquivalencia,
  );

  next();
}

module.exports = solicitudesRevEquivRouter;
