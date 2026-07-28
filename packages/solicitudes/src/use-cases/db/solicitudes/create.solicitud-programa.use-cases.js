const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const { createFolioSolicitud } = require('../../../utils/create-folio.utils');

const ROL_REPRESENTANTE = 3;

const createNuevaSolicitudPrograma = (
  findOneUsuarioQuery,
  findOnePlantelQuery,
  countSolicitudesQuery,
  createSolicitudProgramaAtomicQuery,
) => async (data) => {
  const { usuarioId, tipoSolicitudId } = data;
  const programaData = data?.programa;

  if (!programaData) {
    throw boom.badRequest('[solicitudes]: Programa is required');
  }

  const requiredProgramaFields = ['nivelId', 'cicloId', 'modalidadId', 'plantelId', 'programaTurnos'];
  const missingFields = requiredProgramaFields.filter((field) => {
    if (field === 'programaTurnos') {
      return !Array.isArray(programaData.programaTurnos) || !programaData.programaTurnos.length;
    }
    return !programaData[field];
  });

  if (missingFields.length) {
    throw boom.badRequest(`[solicitudes]: Missing required programa fields: ${missingFields.join(', ')}`);
  }

  const usuario = await findOneUsuarioQuery({ id: usuarioId });

  checkers.throwErrorIfDataIsFalsy(usuario, 'usuarios', usuarioId);

  if (!usuario.estatus) {
    throw boom.badRequest('[solicitudes]: The user is not active');
  }

  if (usuario.rolId !== ROL_REPRESENTANTE) {
    throw boom.badRequest(
      '[solicitudes]: The user is not a REPRESENTANTE role',
    );
  } else if (tipoSolicitudId !== 1) {
    throw boom.badRequest(
      '[solicitudes]: Tipo Solicitud is not correct',
    );
  } else {
    const plantel = await findOnePlantelQuery({ id: programaData.plantelId }, {
      include: [{ association: 'institucion' }],
      strict: false,
    });

    checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', programaData.plantelId);

    const plantelUsuarioId = plantel?.institucion?.usuarioId;
    if (!plantelUsuarioId || plantelUsuarioId !== usuarioId) {
      throw boom.forbidden('[solicitudes]: Plantel is not linked to authenticated representative');
    }

    const totalSolicitudes = await countSolicitudesQuery();
    const folioSolcitud = createFolioSolicitud(totalSolicitudes, data.programa.nivelId);

    const newData = { folio: folioSolcitud, ...data };

    const newSolicitud = await createSolicitudProgramaAtomicQuery(newData);
    checkers.throwErrorIfDataIsFalsy(newSolicitud, 'solicitudes', newSolicitud.id);

    return newSolicitud;
  }
};

module.exports = createNuevaSolicitudPrograma;
