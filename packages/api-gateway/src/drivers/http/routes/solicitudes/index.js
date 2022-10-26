const { solicitudesAdapter } = require('../../adapters');

const {
  createSolicitudProgramaSchema,
} = require('./schema');

async function solicitudRouter(fastify, opts, next) {
  /* await fastify.get(
    '/',
    { schema: findAllSolicitudesSchema },
    solicitudesAdapter.findAllSolicitudes,
  );

  await fastify.get(
    '/instituciones/:institucionId',
    { schema: findAllSolicitudesInstitucionSchema },
    solicitudesAdapter.findAllSolicitudesInstitucion,
  );

  await fastify.get(
    '/:solicitudId',
    {
      schema: findOneDetalleSolicitudSchema,
    },
    solicitudesAdapter.findOneDetalleSolicitud,
  ); */

  await fastify.post(
    '/',
    {
      schema: createSolicitudProgramaSchema,
    },
    solicitudesAdapter.createSolicitudPrograma,
  );

  next();
}

module.exports = solicitudRouter;
