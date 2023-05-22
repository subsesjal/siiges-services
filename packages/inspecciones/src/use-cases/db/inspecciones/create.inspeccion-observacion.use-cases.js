const { checkers } = require('@siiges-services/shared');

const createInspeccionObservacion = (createInspeccionQuery) => async (data) => {
  // const Inspeccion = await findOneInspeccionObservacionQuery({ id: data.inspeccionId });

  // checkers.throwErrorIfDataIsFalsy(Inspeccion, 'Inspeccion', data.inspeccionId);

  const newInspeccionObservacion = await createInspeccionQuery(data);

  checkers.throwErrorIfDataIsFalsy(newInspeccionObservacion, 'inspeccioneObservacion', newInspeccionObservacion.id);

  return newInspeccionObservacion;
};

module.exports = createInspeccionObservacion;
