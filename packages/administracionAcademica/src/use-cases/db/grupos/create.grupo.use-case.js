const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const createGrupo = (
  findOneGrupoQuery,
  findOneCicloEscolarQuery,
  findOneTurnoQuery,
  findOneGradoQuery,
  createGrupoQuery,
) => async (data) => {
  const queryFunctions = {
    turno: [data.turnoId, findOneTurnoQuery],
    grado: [data.gradoId, findOneGradoQuery],
    cicloEscolar: [data.cicloEscolarId, findOneCicloEscolarQuery],
  };
  await checkers.findValidator(queryFunctions);

  const grupoExists = await findOneGrupoQuery({
    descripcion: data.descripcion,
    turnoId: data.turnoId,
    gradoId: data.gradoId,
    cicloEscolarId: data.cicloEscolarId,
  });

  if (grupoExists) {
    throw boom.conflict(`El grupo ${data.descripcion} ya existe para el turno, grado y ciclo escolar especificados.`);
  }

  const grupo = await createGrupoQuery(data);

  return grupo;
};

module.exports = { createGrupo };
