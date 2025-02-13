// const { createFolioSolicitudBeca } = require('../../../utils/create-folio-solicitud.utils');

const createSolicitudBeca = (
  createSolicitudBecaQuery,
  countSolicitudesBecasQuery,
  findOneSolicitudBecaQuery,
) => async (data) => {
  const currentYear = new Date().getFullYear();

  const totalSolicitudes = await countSolicitudesBecasQuery(null, {
    isDeleting: false,
    searchColumn: 'created_at',
    searchText: currentYear.toString(),
    searchType: 'date',
  });
  // const folioSolicitud = await createFolioSolicitudBeca(totalSolicitudes, data.tipoDocumentoId);

  const newData = { folioSolicitud: `FBE${totalSolicitudes}`, ...data };

  const include = [
    { association: 'estatusSolicitudBeca' },
    { association: 'cicloEscolar' },
    { association: 'programa' },
    { association: 'usuario' },
  ];

  const { id } = await createSolicitudBecaQuery({ ...newData });

  return findOneSolicitudBecaQuery({ id }, { include });
};

module.exports = createSolicitudBeca;
