const { checkers } = require('@siiges-services/shared');

const findOneEvaluaciones = (findOneEvaluacionQuery) => async (identifierObj) => {
  const findOneEvaluacion = await findOneEvaluacionQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(findOneEvaluacion, 'Evaluacion', identifierObj.id);
  return findOneEvaluacion;
};

module.exports = { findOneEvaluaciones };
