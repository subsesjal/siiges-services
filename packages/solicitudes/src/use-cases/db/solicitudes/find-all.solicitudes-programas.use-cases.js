const findAllSolicitudesProgramas = (findAllSolicitudesQuery) => async (identifierObj) => {
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
        }],
      }],
  },
  {
    association: 'estatusSolicitud',
  }];

  const solicitudes = await findAllSolicitudesQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  return solicitudes;
};

module.exports = findAllSolicitudesProgramas;
