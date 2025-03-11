const findAllSolicitudesBecasAlumnos = (
  findAllSolicitudesBecasQuery,
) => async (solicitudBecaId) => {
  const include = [
    {
      association: 'alumno',
      include: [{ association: 'persona' }],
    },
    { association: 'grado' },
    { association: 'estatusAlumnoBeca' },
    { association: 'tipoAlumnoBeca' },
  ];

  return findAllSolicitudesBecasQuery(
    { solicitudBecaId },
    { include, strict: false },
  );
};

module.exports = findAllSolicitudesBecasAlumnos;
