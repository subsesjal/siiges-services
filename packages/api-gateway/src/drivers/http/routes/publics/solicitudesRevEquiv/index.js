const solicitudesSchema = require('./schema');
const { solicitudesRevEquiv } = require('../../../adapters');
const { parseDataField } = require('./dataParser');

async function solicitudesRevEquivRouter(fastify, opts, next) {
  fastify.post(
    '/',
    {
      schema: solicitudesSchema.createEquivalenciaSchema,
      preValidation: parseDataField,
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
  fastify.patch(
    '/:solicitudRevEquivId',
    {
      schema: solicitudesSchema.updateEquivalenciaSchema,
    },
    solicitudesRevEquiv.updateEquivalencia,
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
