/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const { createFolioSolicitud } = require('../../../utils/create-folio.utils');

const ROL_REPRESENTANTE = 3;

function removeIds(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeIds);
  }

  for (const key in obj) {
    if (
      key === 'id'
      || key === 'createdAt'
      || key === 'updatedAt'
      || key === 'deletedAt') {
      delete obj[key];
    } else {
      obj[key] = removeIds(obj[key]);
    }
  }

  return obj;
}

const createRefrendoSolicitudPrograma = (
  findOneUsuarioQuery,
  findOneSolicitudQuery,
  countSolicitudesQuery,
  createSolicitudProgramaQuery,
) => async (identifierObj, data) => {
  const { usuarioId, tipoSolicitudId } = data;
  const { solicitudId } = identifierObj;

  if (tipoSolicitudId !== 2) {
    throw boom.badRequest(
      '[solicitudes]: Tipo Solicitud is not correct',
    );
  } else {
    const usuario = await findOneUsuarioQuery({ id: usuarioId });
    checkers.throwErrorIfDataIsFalsy(usuario, 'usuarios', usuarioId);

    const include = [{
      association: 'programa',
    },
      /*       include: [
        { association: 'programaTurnos' },
        { association: 'asignaturas' },
        {
          association: 'docentes',
          include: [
            { association: 'persona' },
            { association: 'asignaturasDocentes' },
          ],
        },
        { association: 'trayectorias' },
      ],
    },
    {
      association: 'diligencias',
      include: [{ association: 'persona' }],
    },
    { association: 'estatusSolicitud' } */
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
    console.log(solicitudDataWithoutIds);

    /* if (usuario.rolId !== ROL_REPRESENTANTE) {
    throw boom.badRequest(
      '[solicitudes]: The user is not a REPRESENTANTE role',
    );
  } */

    // Extract the data values from the original object
    const totalSolicitudes = await countSolicitudesQuery();
    const folioSolcitud = createFolioSolicitud(totalSolicitudes, data.programa.nivelId);
    console.log(folioSolcitud);

    const newData = { ...solicitudDataWithoutIds, folio: folioSolcitud };

    // Create a new solicitud object with the extracted data
    const newSolicitud = await createSolicitudProgramaQuery({
      ...newData,
    }, include);

    checkers.throwErrorIfDataIsFalsy(newSolicitud, 'solicitudes', newSolicitud.id);

    /* const newProgramaTurnosArray = await Promise.all(
      data.programa.programaTurnos.map(async (programaTurno) => {
        const newProgramaTurno = await createProgramaTurnoQuery({
          turnoId: programaTurno,
          programaId: newSolicitud.programa.id,
        });
        return newProgramaTurno.dataValues;
      }),
    );

    newSolicitud.dataValues.programa.dataValues.programaTurnos = newProgramaTurnosArray;
 */
    return newSolicitud;
  }
};

module.exports = createRefrendoSolicitudPrograma;
