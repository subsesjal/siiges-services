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
  countSolicitudesQuery,
) => async ({
  usuarioId,
  estatusSolicitudId,
  limit = 5,
  offset: page = 0,
}) => {
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
  { association: 'estatusSolicitud' },
  { association: 'tipoSolicitud' }];

  let where = { };
  if (usuarioId) {
    const usuario = await findUsuarios(
      findOneUsuarioQuery,
      findOneUsuarioUsuarioQuery,
      usuarioId,
    );
    where = {
      usuarioId: usuario,
    };
  }
  if (estatusSolicitudId) where.estatusSolicitudId = estatusSolicitudId.split(',');

  const offset = page ? (page - 1) * limit : 0;
  const [totalItems, solicitudes] = await Promise.all([
    countSolicitudesQuery(where),
    findAllSolicitudesQuery(
      where,
      {
        limit,
        offset,
        include,
        strict: false,
      },
    ),
  ]);

  const filterOptions = {
    currentPageItems: solicitudes.length,
    totalItems,
    currentPage: page,
    totalPages: limit ? Math.ceil(totalItems / limit) : 1,
  };

  return { solicitudes, filterOptions };
};

module.exports = findAllSolicitudesProgramas;
