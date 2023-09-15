const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionSchema,
  findAllInspeccionPreguntasSchema,
  createInspeccionRespuestasSchema,
  createInspeccionObservacionSchema,
  deleteInspeccionSchema,
  createInspectoresProgramasSchema,
  findAllInspectoresProgramasSchema,
  deleteInspectoresProgramasSchema,
} = require('./schema');
const updateInspectoresProgramasSchema = require('./schema/update.inspectores-programas.schema');

async function inspeccionRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema: createInspeccionSchema,
      onRequest: [fastify.authenticate],
    },
    inspeccionesAdapter.createInspeccion,
  );

  await fastify.post(
    '/:inspeccionId/preguntas',
    {
      schema: createInspeccionRespuestasSchema,
      onRequest: [fastify.authenticate],
    },
    inspeccionesAdapter.createInspeccionRespuestas,
  );

  await fastify.get(
    '/preguntas',
    {
      schema: findAllInspeccionPreguntasSchema,
      onRequest: [fastify.authenticate],
    },
    inspeccionesAdapter.findAllInspeccionPreguntas,
  );

  await fastify.post(
    '/:inspeccionId/observaciones',
    {
      schema: createInspeccionObservacionSchema,
      onRequest: [fastify.authenticate],
    },
    inspeccionesAdapter.createInspeccionObservacion,
  );

  await fastify.delete(
    '/:inspeccionId',
    {
      schema: deleteInspeccionSchema,
      onRequest: [fastify.authenticate],
    },
    inspeccionesAdapter.deleteInspeccion,
  );

  await fastify.post(
    '/inspectores-programas',
    {
      schema: createInspectoresProgramasSchema,
      onRequest: [fastify.authenticate],
    },
    inspeccionesAdapter.createInspectoresProgramas,
  );

  await fastify.get(
    '/inspectores-programas',
    {
      schema: findAllInspectoresProgramasSchema,
      onRequest: [fastify.authenticate],
    },
    inspeccionesAdapter.findAllInspectoresProgramas,
  );

  await fastify.delete(
    '/inspectores-programas/:id',
    {
      schema: deleteInspectoresProgramasSchema,
      onRequest: [fastify.authenticate],
    },
    inspeccionesAdapter.deleteInspectoresProgramas,
  );

  await fastify.patch(
    '/inspectores-programas/:id',
    {
      schema: updateInspectoresProgramasSchema,
      onRequest: [fastify.authenticate],
    },
    inspeccionesAdapter.updateInspectoresProgramas,
  );

  next();
}

module.exports = inspeccionRouter;
