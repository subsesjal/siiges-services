const { checkers } = require('@siiges-services/shared');

const findOneSolicitudSeccion = (
  findOneSolicitudQuery,
  findOneSolicitudSeccionQuery,
  findOneSeccionQuery,
) => async ({ solicitudId, seccionId }) => {
  // find if exist
  const solicitudSeccionFound = await findOneSolicitudSeccionQuery({
    seccionId,
    solicitudId,
  });

  // Validate exist
  const findOneSolicitud = await findOneSolicitudQuery({ id: solicitudId });
  const findOneSeccion = await findOneSeccionQuery({ id: seccionId });
  checkers.throwErrorIfDataIsFalsy(findOneSolicitud, 'Solicitud', solicitudId);
  checkers.throwErrorIfDataIsFalsy(findOneSeccion, 'Seccion', seccionId);
  checkers
    .throwErrorIfDataIsFalsy(solicitudSeccionFound, 'Seccion Observacion', `seccionId: ${seccionId} and solicitudId: ${solicitudId}`);

  return solicitudSeccionFound;
};

module.exports = findOneSolicitudSeccion;
