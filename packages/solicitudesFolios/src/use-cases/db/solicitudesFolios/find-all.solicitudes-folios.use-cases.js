const { Op } = require('sequelize');

const findAllSolicitudesFolios = (findAllSolicitudesFoliosQuery) => async (query = {}) => {
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined),
  );

  if (filteredQuery.estatus) {
    filteredQuery.estatus = filteredQuery.estatus.split(',').map(Number);
  }

  const include = [
    {
      association: 'programa',
      ...(filteredQuery.programaId && { where: { id: filteredQuery.programaId } }),
      include: [
        {
          association: 'plantel',
          ...(filteredQuery.plantelId && { where: { id: filteredQuery.plantelId } }),
          include: [
            { association: 'domicilio', include: [{ association: 'estado' }, { association: 'municipio' }] },
            { association: 'institucion', ...(filteredQuery.institucionId && { where: { id: filteredQuery.institucionId } }) },
          ],
        },
      ],
    },
    {
      association: 'estatusSolicitudFolio',
      ...(filteredQuery.estatus && {
        where: {
          id: { [Op.in]: filteredQuery.estatus },
        },
      }),
    },
    {
      association: 'tipoDocumento',
      ...(filteredQuery.tipoDocumentoId && { where: { id: filteredQuery.tipoDocumentoId } }),
    },
    {
      association: 'tipoSolicitudFolio',
      // eslint-disable-next-line max-len
      ...(filteredQuery.tipoSolicitudFolioId && { where: { id: filteredQuery.tipoSolicitudFolioId } }),
    },
  ];

  const solicitudes = await findAllSolicitudesFoliosQuery(null, { include, strict: true });
  return solicitudes;
};

module.exports = findAllSolicitudesFolios;
