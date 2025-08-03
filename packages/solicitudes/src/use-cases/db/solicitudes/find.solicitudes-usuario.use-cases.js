const findSolicitudesUsuario = (
  findSolicitudesQuery,
  findOneUsuarioQuery,
  findOneUsuarioUsuarioQuery,
) => async (identifierObj) => {
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
  { association: 'estatusSolicitud' },
  { association: 'tipoSolicitud' }];

  let { usuarioId } = identifierObj;
  const { rolId } = await findOneUsuarioQuery({ id: usuarioId });
  if (rolId === 4 || rolId === 12) {
    const { principalId } = await findOneUsuarioUsuarioQuery({ secundarioId: usuarioId });
    if (principalId) {
      usuarioId = principalId;
    }
  }
  const solicitudes = await findSolicitudesQuery({ usuarioId }, {
    undefined,
    include,
    strict: false,
  });

  return solicitudes;
};

module.exports = findSolicitudesUsuario;
