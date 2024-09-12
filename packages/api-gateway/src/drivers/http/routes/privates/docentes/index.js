const { docentesAdapter } = require('../../../adapters');
const {
  createDocenteSchema,
  findOneDocenteSchema,
  updateDocenteSchema,
  findGroupDocentesProgramaSchema,
  deleteDocenteSchema,
} = require('./schema');

async function docenteRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createDocenteSchema },
    docentesAdapter.createDocente,
  );

  await fastify.get(
    '/programas/:programaId',
    { schema: findGroupDocentesProgramaSchema },
    docentesAdapter.findGroupDocentesPrograma,
  );

  await fastify.get(
    '/:docenteId',
    { schema: findOneDocenteSchema },
    docentesAdapter.findOneDocente,
  );

  await fastify.patch(
    '/:docenteId',
    { schema: updateDocenteSchema },
    docentesAdapter.updateDocente,
  );

  await fastify.delete(
    '/:docenteId',
    { schema: deleteDocenteSchema },
    docentesAdapter.deleteDocente,
  );

  next();
}

module.exports = docenteRouter;
