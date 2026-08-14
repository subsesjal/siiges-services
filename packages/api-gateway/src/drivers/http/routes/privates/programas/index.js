const { programasAdapter } = require('../../../adapters');
const {
  findAllProgramasSchema,
  findPlantelProgramasSchema,
  findInstitucionProgramasSchema,
  findOneProgramaSchema,
  updateProgramaSchema,
  updateManyProgramasSchema,
} = require('./schema');

async function programasRouter(fastify, opts, next) {
  await fastify.get(
    '/',
    {
      schema: findAllProgramasSchema,
      onRequest: [fastify.authenticate],
    },
    programasAdapter.findAllProgramas,
  );

  await fastify.get(
    '/planteles/:plantelId',
    {
      schema: findPlantelProgramasSchema,
      onRequest: [fastify.authenticate],
    },
    programasAdapter.findPlantelProgramas,
  );

  await fastify.get(
    '/instituciones/:institucionId',
    {
      schema: findInstitucionProgramasSchema,
      onRequest: [fastify.authenticate],
    },
    programasAdapter.findInstitucionProgramas,
  );

  await fastify.patch(
    '/bulk',
    {
      schema: updateManyProgramasSchema,
      onRequest: [fastify.authenticate],
    },
    programasAdapter.updateManyProgramas,
  );

  await fastify.patch(
    '/:programaId',
    {
      schema: updateProgramaSchema,
      onRequest: [fastify.authenticate],
    },
    programasAdapter.updatePrograma,
  );

  await fastify.get(
    '/:programaId',
    {
      schema: findOneProgramaSchema,
      onRequest: [fastify.authenticate],
    },
    programasAdapter.findOnePrograma,
  );

  next();
}

module.exports = programasRouter;
