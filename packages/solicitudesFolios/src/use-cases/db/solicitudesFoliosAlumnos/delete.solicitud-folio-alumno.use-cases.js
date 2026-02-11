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

  await Promise.all(
    alumnos.map((item, index) => updateSolicitudFolioAlumnoQuery(
      { id: item.id },
      { consecutivo: index + 1 },
    )),
  );

  return true;
};

module.exports = deleteSolicitudFolioAlumno;
