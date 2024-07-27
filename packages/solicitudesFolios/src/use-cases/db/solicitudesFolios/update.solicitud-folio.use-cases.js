const { checkers } = require('@siiges-services/shared');

const createSolicitudFolio = (
  findOneSolicitudFolioQuery,
  updateSolicitudFolioQuery,
) => async (identifierObj, data) => {
  const solicitud = await findOneSolicitudFolioQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes', identifierObj.id);

  const solicitudUpdated = await updateSolicitudFolioQuery(identifierObj, data);

  return solicitudUpdated;
};

module.exports = createSolicitudFolio;
