const findAllInstituciones = (findAllInstitucionesQuery) => async ({ queryParams }) => {
  const include = [
    {
      association: 'ratificacionesNombre',
      limit: 1,
      order: [['createdAt', 'DESC']],
    },
  ];

  const { esNombreAutorizado, tipoInstitucionId } = queryParams;

  let where = null;

  if (tipoInstitucionId) {
    where = { tipoInstitucionId };
  }

  let instituciones = await findAllInstitucionesQuery(where, {
    include,
    strict: false,
  });

  if (esNombreAutorizado) {
    instituciones = instituciones.filter((obj) => {
      const hasRatificaciones = obj.ratificacionesNombre.length > 0;
      const hasAutorizado = obj.ratificacionesNombre.some(
        (ratificacion) => ratificacion.esNombreAutorizado === esNombreAutorizado,
      );

      return hasRatificaciones && hasAutorizado;
    });
  }

  return instituciones;
};

module.exports = findAllInstituciones;
