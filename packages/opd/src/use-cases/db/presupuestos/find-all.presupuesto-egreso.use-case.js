const { checkers } = require('@siiges-services/shared');

const findAllPresupuesto = (
  findAllPresupuestoEgresoQuery,
) => async ({ institucionId }) => {
  // get all information query
  const include = [
    {
      association: 'presupuesto',
      include: [
        { association: 'tipoRecursoPresupuesto' },
        { association: 'tipoPresupuesto' },
        { association: 'tipoEgreso' },
      ],
    },
  ];
  const presupuestoData = await findAllPresupuestoEgresoQuery({
    institucionId,
  }, { include });

  checkers.throwErrorIfDataIsFalsy(presupuestoData.length, 'Presupuesto', institucionId);
  return presupuestoData;
};

module.exports = { findAllPresupuesto };
