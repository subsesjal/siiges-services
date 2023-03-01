const findAllSolicitudesUsuario = (findAllSolicitudesQuery) => async (identifierObj) => {
  const include = [{
    association: 'solicitud',
    include: [{
      association: 'usuario',
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

module.exports = findAllSolicitudesUsuario;
