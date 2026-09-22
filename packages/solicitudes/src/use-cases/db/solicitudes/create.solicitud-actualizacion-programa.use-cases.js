const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const removeIds = require('../../../utils/remove-ids.utils');
const { createFolioSolicitud } = require('../../../utils/create-folio.utils');

const createActualizacionSolicitudPrograma = (
  findOneSolicitudQuery,
  countSolicitudesQuery,
  createSolicitudProgramaQuery,
  findOneEstatusSolicitudQuery,
) => async (identifierObj, data) => {
  const { tipoSolicitudId } = data;
  const { solicitudId } = identifierObj;

  if (tipoSolicitudId !== 5) {
    throw boom.badRequest(
      '[Solicitudes]: El tipo de solicitud no es una actualización',
    );
  }

  const estatusSolicitud = await findOneEstatusSolicitudQuery({ id: 1 });
  checkers.throwErrorIfDataIsFalsy(estatusSolicitud, 'estatus_solicitudes', 1);

  const include = [{
    association: 'programa',
    include: [
      { association: 'programaTurnos' },
      { association: 'asignaturas' },
      { association: 'trayectoria' },
    ],
  }];

  const solicitud = await findOneSolicitudQuery({ id: solicitudId }, {
    undefined,
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(solicitud, 'solicitudes', solicitudId);

  const solicitudData = solicitud.toJSON();

  const solicitudDataWithoutIds = removeIds(solicitudData, {
    keep: ['acuerdoRvoe', 'fechaSurteEfecto'],
  });

  const totalSolicitudes = await countSolicitudesQuery();
  const folioSolcitud = createFolioSolicitud(totalSolicitudes, solicitudDataWithoutIds
    .programa.nivelId);

  const newData = {
    ...solicitudDataWithoutIds,
    folio: folioSolcitud,
    tipoSolicitudId: 5,
    estatusSolicitudId: 1,
    usuarioId: data.usuarioId,
  };

  const newSolicitud = await createSolicitudProgramaQuery({
    ...newData,
  }, include);

  checkers.throwErrorIfDataIsFalsy(newSolicitud, 'solicitudes', newSolicitud.id);

  return newSolicitud;
};

module.exports = createActualizacionSolicitudPrograma;
