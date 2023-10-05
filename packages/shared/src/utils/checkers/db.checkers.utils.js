const boom = require('@hapi/boom');
const { isFalsy } = require('./truthy-falsy');

function entryNotFounded(table, identifierObj) {
  throw boom.notFound(
    `[${table}]: can't ${table} with identifier: ${identifierObj}`,
  );
}

function throwErrorIfDataIsFalsy(entry, table, identifierObj) {
  if (isFalsy(entry)) entryNotFounded(table, identifierObj);
}

/**
 * Validates the parameters using query functions.
 * Throws an error if any of the query functions return a falsy result.
 *
 * @param {{Model: [Id, findFunctionQuery]}} queryFunctions
 * - An object containing query functions as key-value pairs.
 * @returns {Promise<void>} - A promise that resolves when all query functions have been validated.
 * @throws {Error 404} - If any of the query functions return a falsy result.
 *
 * @example
 * const queryFunctions = {
 *  CicloEscolar: [identifierObj.cicloEscolarId, findOneCicloEscolarQuery],
 *  Turno: [identifierObj.turnoId, findOneTurnoQuery],
 *  Grado: [identifierObj.gradoId, findOneGradoQuery],
 * };
 *
 * await findValidator(queryFunctions);
 */
const findValidator = async (queryFunctions) => {
  const entries = Object.entries(queryFunctions);
  await Promise.all(
    entries.map(async ([key, [value, funcion]]) => {
      let functionChecker;
      if (value !== undefined && value !== null) {
        functionChecker = await funcion(
          { id: value },
          { attributes: ['id'] },
        );
        throwErrorIfDataIsFalsy(functionChecker, key, value);
      }
    }),
  );
};

module.exports = {
  throwErrorIfDataIsFalsy,
  findValidator,
};
