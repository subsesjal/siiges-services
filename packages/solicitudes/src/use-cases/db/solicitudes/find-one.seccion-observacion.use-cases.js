const { checkers } = require('@siiges-services/shared');

const findOneSolcitudSeccionObservacion = (
  findOneSolicitudSeccionQuery,
  findOneSolicitudQuery,
) => async ({ seccionId, solicitudId }) => {
  // find if exist
  const seccionObservaciones = await findOneSolicitudSeccionQuery({
    seccionId,
    solicitudId,
  });

  // Validate exist
  const solicitudValidation = await findOneSolicitudQuery({ id: solicitudId });
  checkers.throwErrorIfDataIsFalsy(solicitudValidation, 'Solicitud', solicitudId);
  checkers.throwErrorIfDataIsFalsy(seccionObservaciones, 'Seccion Observacion', seccionId);

  return seccionObservaciones;
};

module.exports = { findOneSolcitudSeccionObservacion };
