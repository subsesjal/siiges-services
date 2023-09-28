const { checkers } = require('@siiges-services/shared');

const createEvaluaciones = (
  createEvaluationQuery,
  findProgramQuery,
  findEvaluadorQuery,
  findOneModalidadQuery,
) => async (identifierObj) => {
  const {
    programaId,
    evaluadorId,
    cumplimiento,
  } = identifierObj;

  const include = [{
    association: 'cumplimiento',
  }];

  // find program, evaluador and cumplimiento
  const findProgram = await findProgramQuery({ id: programaId }, { attributes: ['id'] });
  checkers.throwErrorIfDataIsFalsy(findProgram, 'Programa', programaId);
  const findEvaluador = await findEvaluadorQuery({ id: evaluadorId }, { attributes: ['id'] });
  checkers.throwErrorIfDataIsFalsy(findEvaluador, 'Evaluador', evaluadorId);
  const findModalidad = await findOneModalidadQuery({ id: cumplimiento.modalidadId }, { attributes: ['id'] });
  checkers.throwErrorIfDataIsFalsy(findModalidad, 'Modalidad', cumplimiento.modalidadId);

  // create
  const createEvaluation = await createEvaluationQuery(identifierObj, include);
  checkers.throwErrorIfDataIsFalsy(createEvaluation, 'Evaluciones', '');

  return createEvaluation;
};

module.exports = { createEvaluaciones };
