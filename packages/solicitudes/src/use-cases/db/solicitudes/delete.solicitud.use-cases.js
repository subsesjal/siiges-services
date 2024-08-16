const { checkers } = require('@siiges-services/shared');

const deleteSolicitud = (findOneSolicitudQuery, deleteSolicitudQuery) => async (identifierObj) => {
  const { id } = identifierObj;

  const solicitud = await findOneSolicitudQuery({ id });
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitud', id);

  const solicitudDeleted = await deleteSolicitudQuery({ id });

  return solicitudDeleted;
};

module.exports = { deleteSolicitud };
