const findAllSolicitudesBecasAlumnos = (
  findAllSolicitudesBecasQuery,
) => async (solicitudBecaId) => {
  const include = [
    { association: 'alumno' },
    { association: 'grado' },
    { association: 'estatusSolicitudBeca' },
    { association: 'tipoAlumnoBeca' },
  ];

  const filter = solicitudBecaId ? { solicitud_beca_id: solicitudBecaId } : {};

  const becas = await findAllSolicitudesBecasQuery(
    filter,
    { include, strict: false },
  );

  if (!becas || becas.length === 0) {
    return [];
  }

  return becas;
};

module.exports = findAllSolicitudesBecasAlumnos;
