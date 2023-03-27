const { checkers } = require('@siiges-services/shared');

const setSolicitudSeccion = (
  findOneSolicitudQuery,
  findOneSolicitudSeccionQuery,
  createSolcitudSeccionQuery,
  updateSolicitudSeccionQuery,
) => async (identifierObj) => {
  const { solicitudId, seccionId } = identifierObj;

  const solicitud = await findOneSolicitudQuery({ id: solicitudId });
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes', solicitudId);

  const solicitudSeccionFound = await findOneSolicitudSeccionQuery({ solicitudId, seccionId });

  let solicitudSeccion;
  if (solicitudSeccionFound) {
    const isClosed = !solicitudSeccionFound.isClosed;
    solicitudSeccion = updateSolicitudSeccionQuery(solicitudSeccionFound.id, {
      isClosed,
    });
  } else {
    const newData = { ...identifierObj, isClosed: true };
    solicitudSeccion = createSolcitudSeccionQuery(newData);
  }

  return solicitudSeccion;
};

module.exports = setSolicitudSeccion;
