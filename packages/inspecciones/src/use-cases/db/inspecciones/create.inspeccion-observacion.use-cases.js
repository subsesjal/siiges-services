const { checkers } = require('@siiges-services/shared');

const createInspeccionObservacion = (
  createInspeccionObservacionQuery,
  updateInspeccionObservacionQuery,
  findOneInspeccionObservacionQuery,
  findOneInspeccionQuery,
) => async (data) => {
  const {
    inspeccionId,
    inspeccionApartadoId,
    comentario,
  } = data;

  const Inspeccion = await findOneInspeccionQuery({ id: data.inspeccionId });
  checkers.throwErrorIfDataIsFalsy(Inspeccion, 'Inspeccion', data.inspeccionId);

  const InspeccionObservacion = await findOneInspeccionObservacionQuery({
    inspeccionId,
    inspeccionApartadoId,
  });

  checkers.throwErrorIfDataIsFalsy(InspeccionObservacion, 'Inspeccion', data.inspeccionId);

  let newInspeccionObservacion;

  if (InspeccionObservacion) {
    newInspeccionObservacion = await updateInspeccionObservacionQuery(
      { id: InspeccionObservacion.id },
      { comentario },
    );
  } else {
    newInspeccionObservacion = await createInspeccionObservacionQuery(data);
  }

  checkers.throwErrorIfDataIsFalsy(newInspeccionObservacion, 'inspeccioneObservacion', newInspeccionObservacion.id);

  return newInspeccionObservacion;
};

module.exports = createInspeccionObservacion;
