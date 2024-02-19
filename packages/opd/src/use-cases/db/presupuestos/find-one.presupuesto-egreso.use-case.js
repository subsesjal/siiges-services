const { checkers } = require('@siiges-services/shared');

const findOnePresupuesto = (
  findOnePresupuestoEgresoQuery,
  findAllPresupuestoQuery,
) => async ({ presupuestoEgresoId, filter }) => {
  await checkers.findValidator({
    Presupuesto: [presupuestoEgresoId,
      findOnePresupuestoEgresoQuery],
  });

  const include = [{ association: 'tipoRecursoPresupuesto' },
    { association: 'tipoPresupuesto' },
    { association: 'tipoEgreso' },
  ];

  if (filter) {
    const presupuestoFilter = await findAllPresupuestoQuery({ presupuestoEgresoId });

    const groupedData = presupuestoFilter.reduce((acc, current) => {
      const { tipoPresupuestoId } = current;
      if (!acc[tipoPresupuestoId]) {
        acc[tipoPresupuestoId] = [];
      }
      acc[tipoPresupuestoId].push(current);
      return acc;
    }, {});

    return groupedData;
  }

  const presupuesto = await findAllPresupuestoQuery({ presupuestoEgresoId }, { include });

  return presupuesto;
};

module.exports = { findOnePresupuesto };
