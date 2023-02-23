const { solicitudesAdapter } = require('../../adapters');
const {
  createSolicitudProgramaSchema,
  findAllSolicitudesProgramasSchema,
  updateSolicitudSchema,
} = require('./schema');

// const { solicitud } = require('./schema/properties/solicitud');

async function solicitudRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: findAllSolicitudesProgramasSchema,
    },
    solicitudesAdapter.findAllSolicitudesProgramas,
  );

  await fastify.post(
    '/',
    {
      schema: createSolicitudProgramaSchema,
    },
    solicitudesAdapter.createSolicitudPrograma,
  );

  await fastify.patch(
    '/:solicitudId',
    { schema: updateSolicitudSchema },
    solicitudesAdapter.updateSolicitud,
  );

  next();
}

module.exports = solicitudRouter;
