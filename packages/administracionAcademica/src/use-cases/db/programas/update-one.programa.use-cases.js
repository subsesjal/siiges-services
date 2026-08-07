const boom = require('@hapi/boom');

const updatePrograma = (
  findOneProgramaQuery,
  updateProgramaQuery,
) => async (identifierObj, body) => {
  const programa = await findOneProgramaQuery(identifierObj);

  if (!programa) {
    throw boom.notFound('Programa no encontrado');
  }

  const programaActualizado = await updateProgramaQuery(identifierObj, body);

  return programaActualizado;
};

module.exports = updatePrograma;
