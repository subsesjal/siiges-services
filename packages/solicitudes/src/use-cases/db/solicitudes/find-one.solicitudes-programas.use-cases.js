const findOneSolicitudesProgramas = (findOneSolicitudesQuery) => async (identifierObj) => {
  const include = [{
    association: 'programa',
    include: [{
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

  const solicitudes = await findOneSolicitudesQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  return solicitudes;
};

module.exports = findOneSolicitudesProgramas;
