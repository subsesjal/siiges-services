const { checkers } = require('@siiges-services/shared');

const findAllPresupuesto = (
  findAllPresupuestoEgresoQuery,
) => async ({ institucionId }) => {
  const presupuestoData = await findAllPresupuestoEgresoQuery({
    institucionId,
  });

  checkers.throwErrorIfDataIsFalsy(presupuestoData.length, 'Presupuesto', institucionId);
  return presupuestoData;
};

module.exports = { findAllPresupuesto };
