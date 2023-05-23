const { checkers } = require('@siiges-services/shared');

const createInspeccionObservacion = (createInspeccionObservacionQuery) => async (data) => {
  // const Inspeccion = await findOneInspeccionQuery({ id: data.inspeccionId });

  // checkers.throwErrorIfDataIsFalsy(Inspeccion, 'Inspeccion', data.inspeccionId);

  const newInspeccionObservacion = await createInspeccionObservacionQuery(data);

  checkers.throwErrorIfDataIsFalsy(newInspeccionObservacion, 'inspeccioneObservacion', newInspeccionObservacion.id);

  return newInspeccionObservacion;
};

module.exports = createInspeccionObservacion;
