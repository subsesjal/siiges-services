const findAllInspeccionObservaciones = (
  findAllObservacionesQuery,
) => async ({ inspeccionId }) => {
  const inspeccionesObservacion = await findAllObservacionesQuery({ inspeccionId });
  return inspeccionesObservacion;
};

module.exports = { findAllInspeccionObservaciones };
