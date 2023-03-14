const findProgramasAsignatura = (findAllAsignaturasQuery) => async (identifierObj) => {
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

  const solicitudes = await findAllAsignaturasQuery(identifierObj, {
    undefined,
    include,
    strict: false,
  });

  return solicitudes;
};

module.exports = findProgramasAsignatura;
