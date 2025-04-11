const findAllSolicitudesServSocAlumno = (
  findAllSolicitudesServSocAlumnoQuery,
) => async (solicitudServicioSocialId) => {
  const include = [
    {
      association: 'alumno',
      include: [{ association: 'persona' }],
    },
    { association: 'grado' },
    { association: 'modalidadServicioSocial' },
    { association: 'sectorServicioSocial' },
    {
      association: 'ejeServicioSocial',
      include: [{ association: 'dimensionServicioSocial' }],
    },
  ];

  return findAllSolicitudesServSocAlumnoQuery(
    { solicitudServicioSocialId },
    { include, strict: false },
  );
};

module.exports = findAllSolicitudesServSocAlumno;
