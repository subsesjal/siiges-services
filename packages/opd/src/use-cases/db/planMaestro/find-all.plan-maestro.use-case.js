const { checkers } = require('@siiges-services/shared');

const findAllPlanMaestro = (findAllPlanMaestroQuery) => async ({
  institucionId, periodoId, sesionId,
}) => {
  let where = { institucionId };
  if (sesionId) {
    where = { ...where, sesionId };
  }
  if (periodoId) {
    where = { ...where, periodoId };
  }
  const allPlanMaestro = await findAllPlanMaestroQuery(where);

  checkers.throwErrorIfDataIsFalsy(allPlanMaestro.length, 'Plan Maestro');
  return allPlanMaestro;
};

module.exports = { findAllPlanMaestro };
