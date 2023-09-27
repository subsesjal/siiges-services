const { checkers } = require('@siiges-services/shared');

/**
 * Validates the parameters using query functions.
 * Throws an error if any of the query functions return a falsy result.
 *
 * @param {{params: number}} params - An object containing parameters to be evaluated.
 * @param {{paramsName: Function}} queryFunctions - An object
 * containing query functions to be called.
 * @returns {Promise<void>} - A promise that resolves when all validations are complete.
 * @throws {Error} - If any of the query functions return a falsy result.
 */
const findValidator = async (params, queryFunctions) => {
  const entries = Object.entries(params);

  await Promise.all(
    entries.map(async ([key, value]) => {
      let functionChecker;
      if (value) {
        functionChecker = await queryFunctions[key](
          { id: value },
          { attributes: ['id'] },
        );
        checkers.throwErrorIfDataIsFalsy(functionChecker, key, value);
      }
    }),
  );
};

const updateEvaluaciones = (
  updateEvaluacionQuery,
  findProgramQuery,
  findEvaluadorQuery,
  findOneModalidadQuery,
  findOneEvaluacionQuery,
) => async (identifierObj) => {
  const paramsToEvaluate = {
    evaluacionId: identifierObj.evaluacionId,
    programaId: identifierObj.programaId,
    evaluadorId: identifierObj.evaluadorId,
    cumplimientoId: identifierObj.cumplimientoId,
  };
  const queryFunctions = {
    programaId: findProgramQuery,
    evaluadorId: findEvaluadorQuery,
    cumplimientoId: findOneModalidadQuery,
    evaluacionId: findOneEvaluacionQuery,
  };

  await findValidator(paramsToEvaluate, queryFunctions);

  // create
  const { evaluacionId: id, ...dataChange } = identifierObj;
  const updateEvaluacion = await updateEvaluacionQuery({ id }, dataChange);

  return updateEvaluacion;
};

module.exports = { updateEvaluaciones };
