// const { createFolioSolicitudBeca } = require('../../../utils/create-folio-solicitud.utils');
const padNumber = (num, size) => num.toString().padStart(size, '0');
const createSolicitudServSoc = (
  createSolicitudServSocQuery,
  countSolicitudesServSocQuery,
  findOneSolicitudServSocQuery,
) => async (data) => {
  const currentYear = new Date().getFullYear();

  const totalSolicitudes = await countSolicitudesServSocQuery(null, {
    isDeleting: false,
    searchColumn: 'created_at',
    searchText: currentYear.toString(),
    searchType: 'date',
  });

  // const folioSolicitud = await createFolioSolicitudServSoc();
  const year = new Date().getFullYear();
  const count = padNumber(totalSolicitudes, 4);
  const newData = {
    folioSolicitud: `FSES${year}${count}`,
    ...data,
  };

  const include = [
    { association: 'estatusSolicitudServicioSocial' },
    { association: 'cicloEscolar' },
    { association: 'domicilio' },
  ];

  const { id } = await createSolicitudServSocQuery({ ...newData }, include);

  return findOneSolicitudServSocQuery({ id }, { include });
};

module.exports = createSolicitudServSoc;
