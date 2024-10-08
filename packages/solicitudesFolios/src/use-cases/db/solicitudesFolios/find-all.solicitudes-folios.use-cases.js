const findAllSolicitudesFolios = (
  findAllSolicitudesFoliosQuery,
) => async (query = {}) => {
  const filteredQuery = Object.fromEntries(
    // eslint-disable-next-line no-unused-vars
    Object.entries(query).filter(([_, value]) => value !== undefined),
  );
  const include = [
    {
      association: 'programa',
      include: [
        {
          association: 'plantel',
          include: [
            {
              association: 'domicilio',
              include: [
                { association: 'estado' },
                { association: 'municipio' },
              ],
            },
            { association: 'institucion' },
          ],
        },
      ],
    },
    { association: 'estatusSolicitudFolio' },
    { association: 'tipoDocumento' },
    { association: 'tipoSolicitudFolio' },
  ];

  const solicitudes = await findAllSolicitudesFoliosQuery(
    filteredQuery,
    {
      include,
      strict: false,
    },
  );

  return solicitudes;
};

module.exports = findAllSolicitudesFolios;
