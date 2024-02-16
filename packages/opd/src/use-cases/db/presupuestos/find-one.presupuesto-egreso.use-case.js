const { checkers } = require('@siiges-services/shared');

const findOnePresupuesto = (
  findOnePresupuestoEgresoQuery,
  findAllPresupuestoQuery,
) => async ({ presupuestoEgresoId }) => {
  await checkers.findValidator({
    Presupuesto: [presupuestoEgresoId,
      findOnePresupuestoEgresoQuery],
  });

  const include = [{ association: 'tipoRecursoPresupuesto' },
    { association: 'tipoPresupuesto' },
    { association: 'tipoEgreso' },
  ];

  const presupuesto = await findAllPresupuestoQuery({ presupuestoEgresoId }, { include });

  return presupuesto;
};

module.exports = { findOnePresupuesto };
