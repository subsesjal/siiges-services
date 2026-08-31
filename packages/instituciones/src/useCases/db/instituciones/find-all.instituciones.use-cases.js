/* eslint-disable no-restricted-globals */
const findAllInstituciones = (findAllInstitucionesQuery, findPlantelesQuery) => async ({ queryParams }) => {
  const { esNombreAutorizado, tipoInstitucionId, municipioId } = queryParams;

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

  if (municipioId) {
    const planteles = await findPlantelesQuery(null, {
      attributes: ['institucionId'],
      include: [{ association: 'domicilio', where: { municipioId } }],
      subQuery: false,
    });

    const institucionIds = [...new Set(planteles.map((p) => p.institucionId))];
    instituciones = instituciones.filter((inst) => institucionIds.includes(inst.id));
  }

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
