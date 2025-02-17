const findAllSolicitudBeca = (
  findAllSolicitudBecaQuery,
) => async (query = {}) => {
  const filteredQuery = Object.fromEntries(
    // eslint-disable-next-line no-unused-vars
    Object.entries(query).filter(([_, value]) => value !== undefined),
  );

  const include = [
    {
      association: 'estatusSolicitudBeca',
    },
    {
      association: 'cicloEscolar',
    },
    {
      association: 'programa',
    },
  ];

  const becas = await findAllSolicitudBecaQuery(
    filteredQuery,
    {
      include,
      strict: false,
    },
  );

  return becas;
};

module.exports = findAllSolicitudBeca;
