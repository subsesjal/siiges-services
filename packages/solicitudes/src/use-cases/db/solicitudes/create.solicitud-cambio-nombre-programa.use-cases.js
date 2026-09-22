const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const { createFolioSolicitud } = require('../../../utils/create-folio.utils');

function removeIds(obj) {
  if (typeof obj !== 'object' || obj === null || obj instanceof Date) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeIds);
  }

  const keysToRemove = ['id', 'createdAt', 'updatedAt', 'deletedAt', 'acuerdoRvoe', 'fechaSurteEfecto'];

  const newObj = Object.keys(obj)
    .filter((key) => !keysToRemove.includes(key))
    .reduce((acc, key) => {
      if (typeof obj[key] === 'object') {
        return { ...acc, [key]: removeIds(obj[key]) };
      }
      return { ...acc, [key]: obj[key] };
    }, {});

  return newObj;
}

const createCambioNombreSolicitudPrograma = (
  findOneSolicitudQuery,
  countSolicitudesQuery,
  createSolicitudProgramaQuery,
  findOneEstatusSolicitudQuery,
) => async (identifierObj, data) => {
  const { tipoSolicitudId } = data;
  const { solicitudId } = identifierObj;

  if (tipoSolicitudId !== 6) {
    throw boom.badRequest(
      '[Solicitudes]: El tipo de solicitud no es un cambio de nombre de institución',
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

  const solicitudDataWithoutIds = removeIds(solicitudData);

  const totalSolicitudes = await countSolicitudesQuery();
  const folioSolcitud = createFolioSolicitud(totalSolicitudes, solicitudDataWithoutIds
    .programa.nivelId);

  const newData = {
    ...solicitudDataWithoutIds,
    folio: folioSolcitud,
    tipoSolicitudId: 6,
    estatusSolicitudId: 1,
    usuarioId: data.usuarioId,
  };

  const newSolicitud = await createSolicitudProgramaQuery({
    ...newData,
  }, include);

  checkers.throwErrorIfDataIsFalsy(newSolicitud, 'solicitudes', newSolicitud.id);

  return newSolicitud;
};

module.exports = createCambioNombreSolicitudPrograma;
