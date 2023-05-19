const { checkers } = require('@siiges-services/shared');

const findOneSolicitudSeccion = (
  findOneSolicitudQuery,
  findOneSolicitudSeccionQuery,
) => async (identifierObj) => {
  const { solicitudId, seccionId } = identifierObj;

  const solicitud = await findOneSolicitudQuery({ id: solicitudId });
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes', solicitudId);

  const solicitudSeccionFound = await findOneSolicitudSeccionQuery({ solicitudId, seccionId });

  return solicitudSeccionFound;
};

module.exports = findOneSolicitudSeccion;
