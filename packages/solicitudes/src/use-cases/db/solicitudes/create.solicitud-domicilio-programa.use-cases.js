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

  const keysToRemove = ['id', 'createdAt', 'updatedAt', 'deletedAt'];

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
  findOneUsuarioQuery,
  findOneProgramaQuery,
  findOnePlantelQuery,
  findOneSolicitudQuery,
  countSolicitudesQuery,
  createSolicitudProgramaQuery,
) => async ({ programaId, plantelId, usuarioId }) => {
  // Validation for the user, program and plantel
  const usuario = await findOneUsuarioQuery({ id: usuarioId });
  checkers.throwErrorIfDataIsFalsy(usuario, 'usuarios', usuarioId);
  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);
  const { usuarioId: solicitudUsuarioId, solicitudId } = programa;
  if (solicitudUsuarioId !== usuarioId) boom.badRequest('[solicitudes]: The user is not the owner of the program');
  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);
  if (plantel.usuarioId !== usuarioId) boom.badRequest('[solicitudes]: The user is not the owner of the plantel');

  const include = [{
    association: 'programa',
    include: [
      { association: 'programaTurnos' },
      { association: 'asignaturas' },
      { association: 'trayectoria' },
    ],
  },
  { association: 'representante' },
  { association: 'diligencias' },
  ];

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
