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
      ...(filteredQuery.programaId && { where: { id: filteredQuery.programaId } }),
      include: [
        {
          association: 'plantel',
          ...(filteredQuery.plantelId && { where: { id: filteredQuery.plantelId } }),
          include: [
            {
              association: 'domicilio',
              ...(filteredQuery.domicilioId && { where: { id: filteredQuery.domicilioId } }),
              include: [
                { association: 'estado' },
                { association: 'municipio' },
              ],
            },
            {
              association: 'institucion',
              ...(filteredQuery.institucionId && { where: { id: filteredQuery.institucionId } }),
            },
          ],
        },
      ],
    },
    {
      association: 'estatusSolicitudFolio',
      ...(filteredQuery.estatusSolicitudFolioId && {
        where:
        {
          id: filteredQuery.estatusSolicitudFolioId.map(Number),
        },
      }),
    },
    {
      association: 'tipoDocumento',
      ...(filteredQuery.tipoDocumentoId && { where: { id: filteredQuery.tipoDocumentoId } }),
    },
    {
      association: 'tipoSolicitudFolio',
      ...(filteredQuery.tipoSolicitudFolioId && {
        where: {
          id: filteredQuery.tipoSolicitudFolioId,
        },
      }),
    },
  ];

  const solicitudes = await findAllSolicitudesFoliosQuery(
    null,
    {
      include,
      strict: true,
    },
  );

  return solicitudes;
};

module.exports = findAllSolicitudesFolios;
