const { checkers } = require('@siiges-services/shared');

const updateEvaluaciones = (
  updateEvaluacionQuery,
  findProgramQuery,
  findEvaluadorQuery,
  findOneModalidadQuery,
  findOneEvaluacionQuery,
) => async (identifierObj) => {
  const {
    evaluacionId,
    programaId,
    evaluadorId,
    cumplimientoId,
  } = identifierObj;
  const queryFunctions = {
    programaId: [programaId, findProgramQuery],
    evaluadorId: [evaluadorId, findEvaluadorQuery],
    cumplimientoId: [cumplimientoId, findOneModalidadQuery],
    evaluacionId: [evaluacionId, findOneEvaluacionQuery],
  };

  await checkers.findValidator(queryFunctions);

  // create
  const { evaluacionId: id, ...dataChange } = identifierObj;
  const updateEvaluacion = await updateEvaluacionQuery({ id }, dataChange);

  return updateEvaluacion;
};

module.exports = { updateEvaluaciones };
