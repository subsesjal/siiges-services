const { createFolioSolicitud } = require('../../../utils/create-folio-solicitud.utils');

const createSolicitudFolio = (
  createSolicitudFolioQuery,
  countSolicitudesFoliosQuery,
) => async (data) => {
  const totalSolicitudes = await countSolicitudesFoliosQuery();
  const folioSolcitud = createFolioSolicitud(totalSolicitudes, data.programa.nivelId);

  const newData = { folioSolcitud, ...data };

  const newSolicitudFolio = await createSolicitudFolioQuery({
    ...newData,
  });

  return newSolicitudFolio;
};

module.exports = createSolicitudFolio;
