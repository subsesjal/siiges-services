// const { createFolioSolicitudBeca } = require('../../../utils/create-folio-solicitud.utils');

const createSolicitudBeca = (
  createSolicitudBecaQuery,
  countSolicitudesBecasQuery,
) => async (data) => {
  const currentYear = new Date().getFullYear();

  const totalSolicitudes = await countSolicitudesBecasQuery(null, {
    isDeleting: false,
    searchColumn: 'fecha',
    searchText: currentYear.toString(),
    searchType: 'date',
  });
  // const folioSolicitud = await createFolioSolicitudBeca(totalSolicitudes, data.tipoDocumentoId);

  const newData = { folioSolicitud: `FBE${totalSolicitudes}`, ...data };

  const newSolicitudFolio = await createSolicitudBecaQuery({
    ...newData,
  });

  return newSolicitudFolio;
};

module.exports = createSolicitudBeca;
