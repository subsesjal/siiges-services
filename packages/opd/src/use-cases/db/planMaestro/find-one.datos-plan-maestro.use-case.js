const { checkers } = require('@siiges-services/shared');

const findOneDatosPlanMaestro = (
  findAllProyectoQuery,
  findOnePlanMaestroQuery,
) => async ({ planMaestroId, id = null }) => {
  // Validators
  await checkers.findValidator({ PlanMaestro: [planMaestroId, findOnePlanMaestroQuery] });
  let params = { planMaestroId };
  if (id) {
    params = { id };
    const data = await findAllProyectoQuery({ id }, { attributes: ['id'] });
    checkers.throwErrorIfDataIsFalsy(data.length, 'PlanMaestro', id);
  }

  const include = [
    { association: 'contrato' },
    { association: 'proyectoEspacio' },
    { association: 'proyectoTipoProyecto', include: [{ association: 'tipoProyecto' }] },
  ];

  const planMaestro = await findAllProyectoQuery(params, {
    include,
  });
  checkers.throwErrorIfDataIsFalsy(planMaestro.length, 'PlanMaestro', id);
  return planMaestro;
};

module.exports = { findOneDatosPlanMaestro };
