const { checkers } = require('@siiges-services/shared');

const updateSolicitudPrograma = (
  findOneSolicitudQuery,
  findOneProgramaTurnoQuery,
  findOneProgramaQuery,
  updateSolicitudQuery,
  updateProgramaQuery,
  createProgramaTurnoQuery,
  deleteProgramaTurnoQuery,
) => async (identifierObj, data) => {
  const { ...changesSolicitud } = data;
  const changesPrograma = data?.programa ?? {};

  const solicitud = await findOneSolicitudQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes', identifierObj.id);

  const solicitudUpdated = await updateSolicitudQuery(identifierObj, changesSolicitud);

  const programa = await findOneProgramaQuery({ solicitudId: solicitudUpdated.id });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', { solcitudId: solicitudUpdated.id });

  const programaUpdated = await updateProgramaQuery({ id: programa.id }, changesPrograma);

  solicitudUpdated.dataValues.programa = programaUpdated.dataValues;

  if (changesPrograma && changesPrograma.programaTurnos) {
    const changesProgramaTurnos = changesPrograma.programaTurnos;
    if (changesProgramaTurnos.length) {
      const newProgramaTurnosArray = [];
      await Promise.all([1, 2, 3, 4].map(async (turno) => {
        if (changesProgramaTurnos.some((t) => t === turno)) {
          const turnoPrograma = await findOneProgramaTurnoQuery({
            turnoId: turno,
            programaId: programaUpdated.id,
          });
          if (!turnoPrograma) {
            const newTurnoPrograma = await createProgramaTurnoQuery({
              turnoId: turno,
              programaId: programaUpdated.id,
            });
            newProgramaTurnosArray.push(newTurnoPrograma);
          } else {
            newProgramaTurnosArray.push(turnoPrograma);
          }
        } else {
          const deleteTurnoPrograma = await findOneProgramaTurnoQuery({
            turnoId: turno,
            programaId: programaUpdated.id,
          });
          if (deleteTurnoPrograma) {
            await deleteProgramaTurnoQuery({ id: deleteTurnoPrograma.id });
          }
        }
      }));
      solicitudUpdated.dataValues.programa.programaTurnos = newProgramaTurnosArray;
    }
  }

  return solicitudUpdated;
};

module.exports = updateSolicitudPrograma;
