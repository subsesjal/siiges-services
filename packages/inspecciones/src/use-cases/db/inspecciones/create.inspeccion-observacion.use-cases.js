const { checkers } = require('@siiges-services/shared');

const createInspeccionObservacion = (
  findOneInspeccionQuery,
  findOneInspeccionObservacionQuery,
  createInspeccionObservacionQuery,
  updateInspeccionObservacionQuery,
) => async (data) => {
  const {
    inspeccionId,
    inspeccionApartadoId,
    comentario,
  } = data;

  const inspeccion = await findOneInspeccionQuery({ id: inspeccionId });
  checkers.throwErrorIfDataIsFalsy(inspeccion, 'inspecciones', inspeccionId);

  const inspeccionObservacion = await findOneInspeccionObservacionQuery({
    inspeccionId,
    inspeccionApartadoId,
  });

  let newInspeccionObservacion;

  if (inspeccionObservacion) {
    newInspeccionObservacion = await updateInspeccionObservacionQuery(
      { id: inspeccionObservacion.id },
      { comentario },
    );
  } else {
    newInspeccionObservacion = await createInspeccionObservacionQuery(data);
  }

  return newInspeccionObservacion;
};

module.exports = createInspeccionObservacion;
