const findUsuarios = async (findUsuario, findUsuarioUsuarios, id) => {
  const { rolId } = await findUsuario({ id });
  if (rolId === 3) return id;
  const { principalId } = await findUsuarioUsuarios({ secundarioId: id });
  return principalId;
};

const findAllSolicitudesProgramas = (
  findAllSolicitudesQuery,
  findOneUsuarioQuery,
  findOneUsuarioUsuarioQuery,
) => async ({ usuarioId, estatusSolicitudId }) => {
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
  if (usuarioId) {
    const usuario = await findUsuarios(
      findOneUsuarioQuery,
      findOneUsuarioUsuarioQuery,
      usuarioId,
    );
    query = {
      usuarioId: usuario,
    };
  }
  if (estatusSolicitudId) query.estatusSolicitudId = estatusSolicitudId.split(',');

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
