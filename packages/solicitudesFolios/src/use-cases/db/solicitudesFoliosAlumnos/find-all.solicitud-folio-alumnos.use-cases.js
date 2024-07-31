const findAllSolicitudFolioAlumnos = (
  findAllSolicitudFolioAlumnosQuery,
) => async (query) => {
  const include = [
    {
      association: 'alumno',
      include: [{ association: 'persona' }],
    },
  ];

  const solicitudes = await findAllSolicitudFolioAlumnosQuery(
    query,
    {
      include,
    },
  );

  return solicitudes;
};

module.exports = findAllSolicitudFolioAlumnos;
