const findAllSolicitudesProgramas = (findAllSolicitudesQuery) => async (queryParams) => {
  const include = [{
    association: 'programa',
    include: [
      { association: 'programaTurnos' },
      {
        association: 'plantel',
        include: [{
          association: 'domicilio',
          include: [
            { association: 'estado' },
            { association: 'municipio' },
          ],
        },
        { association: 'institucion' }],
      }],
  },
  {
    association: 'estatusSolicitud',
  }];

  let query = {};
  if (queryParams && queryParams.length > 0) {
    query = {
      estatusSolicitudId: queryParams,
    };
  }

  const solicitudes = await findAllSolicitudesQuery(
    query,
    {
      include,
      strict: false,
    },
  );

  return solicitudes;
};

module.exports = findAllSolicitudesProgramas;
