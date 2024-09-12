const { checkers } = require('@siiges-services/shared');

const findAllInspeccionObservaciones = (
  findAllObservacionesQuery,
) => async ({ inspeccionId }) => {
  const inspeccionesObservacion = await findAllObservacionesQuery({ inspeccionId });
  checkers.throwErrorIfDataIsFalsy(inspeccionesObservacion, 'Inspecciones-preguntas', inspeccionId);
  return inspeccionesObservacion;
};

module.exports = { findAllInspeccionObservaciones };
