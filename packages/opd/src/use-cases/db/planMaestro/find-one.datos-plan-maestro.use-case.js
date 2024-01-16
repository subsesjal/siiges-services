const { checkers } = require('@siiges-services/shared');

const findOneDatosPlanMaestro = (
  findAllProyectoQuery,
  findOnePlanMaestroQuery,
) => async ({ planMaestroId }) => {
  await checkers.findValidator({ PlanMaestro: [planMaestroId, findOnePlanMaestroQuery] });
  const include = [
    { association: 'contrato' },
    { association: 'proyectoEspacio' },
    { association: 'tipoProyecto' },
  ];

  const planMaestro = await findAllProyectoQuery({ planMaestroId }, {
    include,
  });

  return planMaestro;
};

module.exports = { findOneDatosPlanMaestro };
