const { checkers } = require('@siiges-services/shared');

const deleteSolicitudServSocAlumno = (
  findOneSolicitudServicioSocialAlumnoQuery,
  deleteSolicitudServicioSocialAlumnoQuery,
) => async (identifierObj) => {
  const { id } = identifierObj;

  const solicitudServicioSocialAlumnoFound = await findOneSolicitudServicioSocialAlumnoQuery(
    identifierObj,
  );
  checkers.throwErrorIfDataIsFalsy(solicitudServicioSocialAlumnoFound, 'solicitudesServicioSocialAlumno', id);

  return deleteSolicitudServicioSocialAlumnoQuery(identifierObj);
};

module.exports = deleteSolicitudServSocAlumno;
