const { checkers } = require('@siiges-services/shared');

const findAllPlanMaestro = (findAllPlanMaestroQuery) => async (queryParams) => {
  const allPlanMaestro = await findAllPlanMaestroQuery(queryParams);

  checkers.throwErrorIfDataIsFalsy(allPlanMaestro.length, 'Plan Maestro');
  return allPlanMaestro;
};

module.exports = { findAllPlanMaestro };
