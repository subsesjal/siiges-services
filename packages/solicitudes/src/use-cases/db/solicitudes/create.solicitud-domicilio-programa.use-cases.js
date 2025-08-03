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

const createDomicilioSolicitudPrograma = (
  findOneSolicitudQuery,
  countSolicitudesQuery,
  createSolicitudProgramaQuery,
) => async ({ solicitudId, plantelId }, data) => {
  const { tipoSolicitudId } = data;

  if (tipoSolicitudId !== 3) {
    throw boom.badRequest('[Solicitudes]: El tipo de solicitud no es cambio de domicilio');
  }

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

  // Assuming solicitudData is your response object
  const solicitudDataWithoutIds = removeIds(solicitudData);

  // Extract the data values from the original object
  const totalSolicitudes = await countSolicitudesQuery();
  const folioSolcitud = createFolioSolicitud(totalSolicitudes, solicitudDataWithoutIds
    .programa.nivelId);

  const newData = {
    ...solicitudDataWithoutIds,
    folio: folioSolcitud,
    tipoSolicitudId: 3,
    estatusSolicitudId: 1,
  };
  newData.programa.plantelId = plantelId;

  // Create a new solicitud object with the extracted data
  const newSolicitud = await createSolicitudProgramaQuery({
    ...newData,
  }, include);

  checkers.throwErrorIfDataIsFalsy(newSolicitud, 'solicitudes', newSolicitud.id);

  return newSolicitud;
};

module.exports = { createDomicilioSolicitudPrograma };
