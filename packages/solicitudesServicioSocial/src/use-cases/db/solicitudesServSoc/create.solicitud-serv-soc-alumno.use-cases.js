const createSolicitudServSocAlumno = (
  createSolicitudServSocAlumnoQuery,
  findOneSolicitudServSocAlumnoQuery,
) => async (data) => {
  const include = [
    { association: 'alumno' },
    { association: 'grado' },
    { association: 'modalidadServicioSocial' },
    { association: 'sectorServicioSocial' },
    {
      association: 'ejeServicioSocial',
      include: [
        { association: 'dimensionServicioSocial' },
      ],
    },
  ];

  const { id } = await createSolicitudServSocAlumnoQuery(data);

  return findOneSolicitudServSocAlumnoQuery({ id }, { include });
};

module.exports = createSolicitudServSocAlumno;
