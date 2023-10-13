const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const { createFolioSolicitud } = require('../../../utils/create-folio.utils');

const ROL_REPRESENTANTE = 3;

const createNuevaSolicitudPrograma = (
  findOneUsuarioQuery,
  countSolicitudesQuery,
  createSolicitudProgramaQuery,
  createProgramaTurnoQuery,
) => async (data) => {
  const { usuarioId, tipoSolicitudId } = data;

  const usuario = await findOneUsuarioQuery({ id: usuarioId });

  checkers.throwErrorIfDataIsFalsy(usuario, 'usuarios', usuarioId);

  if (usuario.rolId !== ROL_REPRESENTANTE) {
    throw boom.badRequest(
      '[solicitudes]: The user is not a REPRESENTANTE role',
    );
  } else if (tipoSolicitudId !== 1) {
    throw boom.badRequest(
      '[solicitudes]: Tipo Solicitud is not correct',
    );
  } else {
    const totalSolicitudes = await countSolicitudesQuery();
    const folioSolcitud = createFolioSolicitud(totalSolicitudes, data.programa.nivelId);

    const newData = { folio: folioSolcitud, ...data };

    const include = [{ association: 'programa' }];
    const newSolicitud = await createSolicitudProgramaQuery(newData, include);
    checkers.throwErrorIfDataIsFalsy(newSolicitud, 'solicitudes', newSolicitud.id);

    const newProgramaTurnosArray = await Promise.all(
      data.programa.programaTurnos.map(async (programaTurno) => {
        const newProgramaTurno = await createProgramaTurnoQuery({
          turnoId: programaTurno,
          programaId: newSolicitud.programa.id,
        });
        return newProgramaTurno.dataValues;
      }),
    );

    newSolicitud.dataValues.programa.dataValues.programaTurnos = newProgramaTurnosArray;

    return newSolicitud;
  }
};

module.exports = createNuevaSolicitudPrograma;
