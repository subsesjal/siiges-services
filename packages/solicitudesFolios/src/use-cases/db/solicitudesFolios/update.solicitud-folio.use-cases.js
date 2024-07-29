const { checkers } = require('@siiges-services/shared');

const updateSolicitudFolio = (
  findOneSolicitudFolioQuery,
  updateSolicitudFolioQuery,
) => async (identifierObj, data) => {
  const solicitud = await findOneSolicitudFolioQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes-folios', identifierObj.id);

  const solicitudFolioUpdated = await updateSolicitudFolioQuery(identifierObj, data);

  return solicitudFolioUpdated;
};

module.exports = updateSolicitudFolio;
