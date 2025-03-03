const findAllSolicitudesServSocAlumno = (findAllSolicitudesServSocAlumnoQuery) => async () => {
  const include = [
    { association: 'alumno' },
    { association: 'grado' },
    { association: 'modalidadServicioSocial' },
    { association: 'sectorServicioSocial' },
    {
      association: 'ejeServicioSocial',
      include: [{ association: 'dimensionServicioSocial' }],
    },
  ];

  return findAllSolicitudesServSocAlumnoQuery({}, { include });
};

module.exports = findAllSolicitudesServSocAlumno;
