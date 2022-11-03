const { checkers } = require('@siiges-services/shared');
const { createFolioSolicitud } = require('../../../utils/create-folio.utils');

const createSolicitud = (
  createSolicitudQuery,
  findOneNivelEducativoQuery,
  updateAndFindSolicitudQuery,
) => async (data) => {
  const include = [{ association: 'programa' }];

  const newSolicitud = await createSolicitudQuery(data, include);
  const nivel = await findOneNivelEducativoQuery({ id: newSolicitud.programa.nivelId });
  checkers.throwErrorIfDataIsFalsy(nivel);

  const newData = { ...newSolicitud.dataValues, nivel };
  const folio = createFolioSolicitud(newData);

  const solicitudUpdated = await updateAndFindSolicitudQuery(
    { id: newSolicitud.id },
    { folio },
    { include },
  );

  return solicitudUpdated;
};

module.exports = createSolicitud;
