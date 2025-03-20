const { checkers } = require('@siiges-services/shared');

const deleteSolicitudServicioSocial = (
  findOneSolicitudServicioSocialQuery,
  deleteSolicitudesServicioSocialQuery,
) => async (identifierObj) => {
  const { id } = identifierObj;

  const solicitudServicioSocialFound = await findOneSolicitudServicioSocialQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudServicioSocialFound, 'solicitudesServicioSocial', id);

  return deleteSolicitudesServicioSocialQuery(identifierObj);
};

module.exports = deleteSolicitudServicioSocial;
