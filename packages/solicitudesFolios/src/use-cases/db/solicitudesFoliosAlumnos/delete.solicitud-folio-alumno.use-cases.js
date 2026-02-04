const { checkers } = require('@siiges-services/shared');

const deleteSolicitudFolioAlumno = (
  findOneSolicitudFolioAlumnoQuery,
  deleteSolicitudFolioAlumnoQuery,
  updateSolicitudFolioAlumnoQuery,
  findAllSolicitudFolioAlumnosQuery,
) => async ({ id }) => {
  const alumno = await findOneSolicitudFolioAlumnoQuery({ id });
  checkers.throwErrorIfDataIsFalsy(alumno, 'solicitudes-folios-alumnos', id);

  const { solicitudFolioId } = alumno;

  await deleteSolicitudFolioAlumnoQuery({ id });

  const alumnos = await findAllSolicitudFolioAlumnosQuery(
    { solicitudFolioId },
    { order: [['consecutivo', 'ASC']] },
  );

  let consecutivo = 1;

  for (let i = 0; i < alumnos.length; i += 1) {
    const item = alumnos[i];

    if (item.consecutivo !== consecutivo) {
      // eslint-disable-next-line no-await-in-loop
      await updateSolicitudFolioAlumnoQuery(
        { id: item.id },
        { consecutivo },
      );
    }

    consecutivo += 1;
  }

  return true;
};

module.exports = deleteSolicitudFolioAlumno;
