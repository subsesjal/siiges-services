const { checkers } = require('@siiges-services/shared');

const deleteSolicitudBecaAlumno = (
  findOneSolicitudBecaAlumnoQuery,
  deleteSolicitudBecaAlumnoQuery,
) => async (identifierObj) => {
  const { id } = identifierObj;

  const solicitudBecaAlumnoFound = await findOneSolicitudBecaAlumnoQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudBecaAlumnoFound, 'solicitudesBecasAlumnos', id);

  return deleteSolicitudBecaAlumnoQuery(identifierObj);
};

module.exports = deleteSolicitudBecaAlumno;
