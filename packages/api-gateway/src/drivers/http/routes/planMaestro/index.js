const { planesMaestrosAdapter } = require('../../adapters');
const schemas = require('./schemas');

async function orgColegiadosRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: schemas.createPlanMaestroSchema,
    //   onRequest: [fastify.authenticate],
    },
    planesMaestrosAdapter.createPlanMaestro,
  );

  await fastify.post(
    '/responsables/:planMaestroId',
    {
      schema: schemas.createResponsablesSchema,
    //   onRequest: [fastify.authenticate],
    },
    planesMaestrosAdapter.createResponsables,
  );

  await fastify.post(
    '/datosDelProyecto/:planMaestroId',
    {
      schema: schemas.createDatosDeProyectoSchema,
    //   onRequest: [fastify.authenticate],
    },
    planesMaestrosAdapter.createDatosDeProyecto,
  );

  await fastify.get(
    '/datosDelProyecto/:planMaestroId',
    {
      schema: schemas.findOneDatosDeProyectoSchema,
      //   onRequest: [fastify.authenticate],
    },
    planesMaestrosAdapter.findOneDatosPlanMaestro,
  );

  await fastify.get(
    '/responsables/:planMaestroId',
    {
      schema: schemas.findOneResponsablesSchema,
      //   onRequest: [fastify.authenticate],
    },
    planesMaestrosAdapter.findOneResponsablesPlanMaestro,
  );

  next();
}

module.exports = orgColegiadosRouter;
