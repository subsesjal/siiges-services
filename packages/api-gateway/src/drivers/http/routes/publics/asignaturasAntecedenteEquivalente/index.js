const solicitudesRevEquiv = require('../../../adapters/solicitudesRevEquiv/handlers');
const asignaturasAntecedentesEquivalnetesSchema = require('./schema/index');

async function asignaturasAntecedenteEquivalenteRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    {
      schema:
      asignaturasAntecedentesEquivalnetesSchema.createAsignaturasAntecedentesEquivalencia,
    },
    solicitudesRevEquiv.createAsignaturaAntecedenteEquivalente,
  );

  await fastify.get(
    '/:asignaturaAntecedenteEquivalenteId',
    {
      schema:
      asignaturasAntecedentesEquivalnetesSchema.findOneAsignaturaAntecedenteEquivalenteSchema,
    },
    solicitudesRevEquiv.findOneAsignaturaAntecedenteEquivalente,
  );

  await fastify.delete(
    '/:asignaturaAntecedenteEquivalenteId',
    {
      schema:
      asignaturasAntecedentesEquivalnetesSchema.deleteAsignaturaAntecedenteEquivalenteSchema,
    },
    solicitudesRevEquiv.deleteAsignaturaAntecedenteEquivalente,
  );

  next();
}

module.exports = asignaturasAntecedenteEquivalenteRouter;
