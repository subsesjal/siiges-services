const { checkers } = require('@siiges-services/shared');

const updateGrupo = (
  findOneCicloEscolarQuery,
  findOneTurnoQuery,
  findOneGradoQuery,
  updateGrupoQuery,
  findGrupoQuery,
) => async ({ id, data }) => {
  const queryFunctions = {
    Ciclo: [data.cicloEscolarId, findOneCicloEscolarQuery],
    Turno: [data.turnoId, findOneTurnoQuery],
    Grado: [data.gradoId, findOneGradoQuery],
  };
  await findGrupoQuery({ id });
  await checkers.findValidator(queryFunctions);

  const cicloEscolarUpdate = await updateGrupoQuery({ id }, data);

  return cicloEscolarUpdate;
};

module.exports = { updateGrupo };
