const { checkers } = require('@siiges-services/shared');

const findOneDatosPlanMaestro = (
  findAllDatosDelProyectoQuery,
  findOnePlanMaestroQuery,
) => async ({ planMaestroId }) => {
  await checkers.findValidator({ PlanMaestro: [planMaestroId, findOnePlanMaestroQuery] });
  const include = [
    { association: 'contratoYCalendario' },
    { association: 'espaciosDeEquipamento' },
    { association: 'tipoDeProyecto' },
  ];

  const planMaestro = await findAllDatosDelProyectoQuery({ planMaestroId }, {
    include,
  });

  return planMaestro;
};

module.exports = { findOneDatosPlanMaestro };
