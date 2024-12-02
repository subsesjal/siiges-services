const findAllSolicitudesRevEquiv = (
  findAllSolicitudesRevEquivQuery,
) => async (query = {}) => {
  const filteredQuery = Object.fromEntries(
    // eslint-disable-next-line no-unused-vars
    Object.entries(query).filter(([_, value]) => value !== undefined),
  );

  const include = [
    {
      association: 'interesado',
      include: [
        { association: 'persona', include: [{ association: 'domicilio' }] },
        { association: 'institucionProcedencia' },
        { association: 'institucionDestino' },
      ],
    },
  ];

  return findAllSolicitudesRevEquivQuery(filteredQuery, { include });
};

module.exports = findAllSolicitudesRevEquiv;
