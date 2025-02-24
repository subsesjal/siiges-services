const { checkers } = require('@siiges-services/shared');

const updateSolicitudServSoc = (
  findOneSolicitudServSocQuery,
  updateSolicitudServSocQuery,
  updateDomicilioQuery,
) => async (data, identifierObj) => {
  const solicitud = await findOneSolicitudServSocQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(
    solicitud,
    'solicitud-serv-soc',
    identifierObj.id,
  );

  const { domicilio: domicilioData, ...restData } = data;

  const include = [
    { association: 'estatusSolicitudServicioSocial' },
    { association: 'cicloEscolar' },
    { association: 'domicilio' },
  ];

  let updatedSolicitud = await updateSolicitudServSocQuery(
    identifierObj,
    restData,
    { include },
  );

  if (domicilioData) {
    await updateDomicilioQuery({ id: updatedSolicitud.domicilioId }, domicilioData);
    updatedSolicitud = await findOneSolicitudServSocQuery(identifierObj, { include });
  }

  return updatedSolicitud;
};

module.exports = updateSolicitudServSoc;
