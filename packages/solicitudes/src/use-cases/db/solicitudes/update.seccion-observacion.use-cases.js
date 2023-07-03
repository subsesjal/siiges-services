const updateSolcitudSeccionObservacion = (
  findOneSolicitudSeccionQuery,
  createSolcitudSeccionQuery,
  updateSolicitudSeccionQuery,
) => async (data) => {
  const {
    seccionId,
    solicitudId,
    observaciones,
  } = data;

  const SeccionObservaciones = await findOneSolicitudSeccionQuery({
    seccionId,
    solicitudId,
  });

  let newSeccionObservaciones;

  if (SeccionObservaciones) {
    newSeccionObservaciones = await updateSolicitudSeccionQuery(
      { id: SeccionObservaciones.id },
      { observaciones },
    );
  } else {
    newSeccionObservaciones = await createSolcitudSeccionQuery(data);
  }

  return newSeccionObservaciones;
};

module.exports = updateSolcitudSeccionObservacion;
