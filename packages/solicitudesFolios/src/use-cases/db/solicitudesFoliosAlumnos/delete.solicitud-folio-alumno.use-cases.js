const { checkers } = require('@siiges-services/shared');

const deleteSolicitudFolioAlumno = (
  findOneSolicitudFolioAlumnoQuery,
  deleteSolicitudFolioAlumnoQuery,
) => async ({ id }) => {
  const alumno = await findOneSolicitudFolioAlumnoQuery({ id });
  checkers.throwErrorIfDataIsFalsy(alumno, 'solicitudes-folios-alumnos', id);

  const alumnoDeleted = await deleteSolicitudFolioAlumnoQuery({ id });

  return alumnoDeleted;
};

module.exports = deleteSolicitudFolioAlumno;
