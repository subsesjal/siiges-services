const { checkers } = require('@siiges-services/shared');

const findAllInspecciones = (
  findAllInspeccionQuery,
) => async () => {
  const inspecciones = await findAllInspeccionQuery();
  checkers.throwErrorIfDataIsFalsy(inspecciones, 'Inspecciones');
  return inspecciones;
};

module.exports = findAllInspecciones;
