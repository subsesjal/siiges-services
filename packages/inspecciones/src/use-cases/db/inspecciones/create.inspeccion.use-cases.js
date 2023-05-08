const { checkers } = require('@siiges-services/shared');

const createInspeccion = (createInspeccionQuery) => async (data) => {
  const newInspeccion = await createInspeccionQuery(data);
  checkers.throwErrorIfDataIsFalsy(newInspeccion, 'inspecciones', newInspeccion.id);

  return newInspeccion;
};

module.exports = createInspeccion;
