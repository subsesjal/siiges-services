const findCumplimiento = (findAllCumplimientosQuery) => async (queryParams) => {
  const { modalidad, puntuacion } = queryParams;

  const findAllCumplimientos = await findAllCumplimientosQuery({ modalidadId: modalidad });

  // Find the cumplimiento that matches the puntuacion
  const matchingCumplimiento = findAllCumplimientos.find(
    (cumplimiento) => puntuacion >= cumplimiento.cumplimientoMinimo
    && puntuacion <= cumplimiento.cumplimientoMaximo,
  );

  return matchingCumplimiento;
};

module.exports = { findCumplimiento };
