const { checkers } = require('@siiges-services/shared');

const findOneSolicitudPrograma = (findOneSolicitudProgramaQuery) => async (identifierObj) => {
  const include = [
    { association: 'programa' },
    { association: 'estatusSolicitud' },
  ];

  const solicitud = await findOneSolicitudProgramaQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes', identifierObj);

  return solicitud;
};

module.exports = findOneSolicitudPrograma;
