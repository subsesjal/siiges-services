const solicitudesSchema = require('./schema');
const { solicitudesRevEquiv } = require('../../../adapters');
const { parseDataField } = require('./dataParser');

async function solicitudesRevEquivRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: solicitudesSchema.createSolicitudRevEquivSchema,
      preValidation: parseDataField,
    },
    solicitudesRevEquiv.createSolicitudRevEquiv,
  );

  await fastify.get(
    '/:folioSolicitud',
    {
      schema: solicitudesSchema.findSolicitudRevEquivSchema,
    },
    solicitudesRevEquiv.findSolicitudRevEquivByFolio,
  );

  next();
}

module.exports = solicitudesRevEquivRouter;
