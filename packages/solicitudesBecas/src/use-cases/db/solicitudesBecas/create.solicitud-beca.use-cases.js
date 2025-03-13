const padNumber = (num, size) => num.toString().padStart(size, '0');
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

  const year = new Date().getFullYear();
  const count = padNumber(totalSolicitudes, 4);
  const newData = {
    folioSolicitud: `FBE${year}${count}`,
    ...data,
  };
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
