const { checkers } = require('@siiges-services/shared');

const createGrupo = (
  findOneCicloEscolarQuery,
  findOneTurnoQuery,
  findOneGradoQuery,
  createGrupoQuery,
) => async (identifierObj) => {
  const queryFunctions = {
    turno: [identifierObj.turnoId, findOneTurnoQuery],
    grado: [identifierObj.gradoId, findOneGradoQuery],
    cicloEscolar: [identifierObj.cicloEscolarId, findOneCicloEscolarQuery],
  };
  await checkers.findValidator(queryFunctions);

  const grupo = await createGrupoQuery(identifierObj);

  return grupo;
};

module.exports = { createGrupo };
