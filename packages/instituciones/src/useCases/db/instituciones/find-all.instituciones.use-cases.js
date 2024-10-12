/* eslint-disable no-restricted-globals */
const findAllInstituciones = (findAllInstitucionesQuery) => async ({ queryParams }) => {
  const { esNombreAutorizado, tipoInstitucionId } = queryParams;

  const includeValidate = esNombreAutorizado !== undefined ? [{
    association: 'ratificacionesNombre', limit: 1, order: [['createdAt', 'DESC']], where: { esNombreAutorizado },
  }] : [{
    association: 'ratificacionesNombre',
    limit: 1,
    order: [['createdAt', 'DESC']],
  }];

  const include = includeValidate;
  let where = null;

  if (tipoInstitucionId) {
    where = { tipoInstitucionId };
  }

  let instituciones = await findAllInstitucionesQuery(where, {
    include,
    strict: true,
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
