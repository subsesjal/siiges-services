const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');

const updateGrupo = (
  findOneCicloEscolarQuery,
  findOneTurnoQuery,
  findOneGradoQuery,
  updateGrupoQuery,
  findGrupoQuery,
) => async ({ id, data }) => {
  const { descripcion } = data;
  const queryFunctions = {
    Ciclo: [data.cicloEscolarId, findOneCicloEscolarQuery],
    Turno: [data.turnoId, findOneTurnoQuery],
    Grado: [data.gradoId, findOneGradoQuery],
  };
  const grupoExists = await findGrupoQuery({ id });
  await checkers.findValidator(queryFunctions);

  if (descripcion && grupoExists.descripcion !== descripcion) {
    const exists = await findGrupoQuery({
      descripcion: data.descripcion,
      turnoId: data.turnoId,
      gradoId: data.gradoId,
      cicloEscolarId: data.cicloEscolarId,
    });

    if (exists) {
      throw boom.conflict(`El grupo ${data.descripcion} ya existe para el turno, grado y ciclo escolar especificados.`);
    }
  }

  const cicloEscolarUpdate = await updateGrupoQuery({ id }, data);

  return cicloEscolarUpdate;
};

module.exports = { updateGrupo };
