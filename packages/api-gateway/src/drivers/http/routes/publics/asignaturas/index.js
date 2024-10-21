const { asignaturasAdapter } = require('../../../adapters');
const {
  findProgramaAsignaturasSchema,
} = require('../../privates/asignaturas/schema');

async function asignaturaRouter(fastify, opts, next) {
  await fastify.get(
    '/programas/:programaId',
    { schema: findProgramaAsignaturasSchema },
    asignaturasAdapter.findProgramaAsignaturas,
  );

  next();
}

module.exports = asignaturaRouter;
