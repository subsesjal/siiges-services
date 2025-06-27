const { alumnosAdapter } = require('../../../adapters');

const { findOneAlumnoTituloSchema } = require('./schema');

async function alumnoRouter(fastify, opts, next) {
  await fastify.get(
    '/titulos',
    { schema: findOneAlumnoTituloSchema },
    alumnosAdapter.findOneAlumnoTitulo,
  );

  next();
}

module.exports = alumnoRouter;
