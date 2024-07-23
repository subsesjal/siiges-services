const { createFolioSolicitud } = require('../../../utils/create-folio-solicitud.utils');

const createSolicitudFolio = (
  createSolicitudFolioQuery,
  countSolicitudesFoliosQuery,
) => async (data) => {
  const currentYear = new Date().getFullYear();

  const totalSolicitudes = await countSolicitudesFoliosQuery(null, {
    isDeleting: false,
    searchColumn: 'fecha',
    searchText: currentYear.toString(),
    searchType: 'date',
  });
  const folioSolicitud = await createFolioSolicitud(totalSolicitudes, data.tipoDocumentoId);

  const newData = { folioSolicitud, ...data };

  const newSolicitudFolio = await createSolicitudFolioQuery({
    ...newData,
  });

  return newSolicitudFolio;
};

module.exports = createSolicitudFolio;
