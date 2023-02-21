const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const { createFolioSolicitud } = require('../../../utils/create-folio.utils');

const ROL_REPRESENTANTE = 3;

const createSolicitudPrograma = (
  findOneUsuarioQuery,
  countSolicitudesQuery,
  createSolicitudProgramaQuery,
) => async (data) => {
  const { usuarioId } = data;

  const usuario = await findOneUsuarioQuery({ id: usuarioId });

  checkers.throwErrorIfDataIsFalsy(usuario, 'usuarios', usuarioId);

  if (usuario.rolId !== ROL_REPRESENTANTE) {
    throw boom.badRequest(
      '[usuario:finOne]: The user is not a REPRESENTANTE role',
    );
  } else {
    const totalSolicitudes = await countSolicitudesQuery();
    const folioSolcitud = createFolioSolicitud(totalSolicitudes, data.programa.nivelId);

    const newData = { folio: folioSolcitud, ...data };

    const include = [{ association: 'programa' }];
    const newSolicitud = await createSolicitudProgramaQuery(newData, include);

    return newSolicitud;
  }
};

module.exports = createSolicitudPrograma;
