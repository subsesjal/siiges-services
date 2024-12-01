const solicitudesSchema = require('./schema');
const { solicitudesRevEquiv } = require('../../../adapters');
const { parseDataField } = require('./dataParser');

async function solicitudesRevEquivRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: solicitudesSchema.createEquivalenciaSchema,
      preValidation: parseDataField,
    },
    solicitudesRevEquiv.createEquivalencia,
  );

  next();
}

module.exports = solicitudesRevEquivRouter;
