const { checkers } = require('@siiges-services/shared');

const createEvaluaciones = (
  createEvaluationQuery,
  findProgramQuery,
  findEvaluadorQuery,
  findOneCumplimientoQuery,
) => async (identifierObj) => {
  const queryFunctions = {
    Programa: [identifierObj.programaId, findProgramQuery],
    Evaluador: [identifierObj.evaluadorId, findEvaluadorQuery],
    Cumplimiento: [identifierObj.cumplimientoId, findOneCumplimientoQuery],
  };
  // find program, evaluador and cumplimiento
  await checkers.findValidator(queryFunctions);

  // create
  const createEvaluation = await createEvaluationQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(createEvaluation, 'Evaluciones', '');

  return createEvaluation;
};

module.exports = { createEvaluaciones };
