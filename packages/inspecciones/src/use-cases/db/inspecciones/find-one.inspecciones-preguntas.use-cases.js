const { checkers } = require('@siiges-services/shared');

const findOneInspeccionesPreguntas = (
  findAllInspeccionInspeccionPreguntaQuery,
) => async ({ inspeccionId }) => {
  const inspeccionesPreguntas = await findAllInspeccionInspeccionPreguntaQuery({ inspeccionId });
  checkers.throwErrorIfDataIsFalsy(inspeccionesPreguntas, 'Inspecciones-preguntas', inspeccionId);
  return inspeccionesPreguntas;
};

module.exports = { findOneInspeccionesPreguntas };
