const findAllSolicitudFolioAlumnos = (
  findAllSolicitudFolioAlumnosQuery,
) => async (query = {}) => {
  const filteredQuery = Object.fromEntries(
    // eslint-disable-next-line no-unused-vars
    Object.entries(query).filter(([_, value]) => value !== undefined),
  );
  const include = [
    {
      association: 'alumno',
      include: [{ association: 'persona' }],
    },
  ];

  const solicitudes = await findAllSolicitudFolioAlumnosQuery(
    filteredQuery,
    {
      include,
    },
  );

  return solicitudes;
};

module.exports = findAllSolicitudFolioAlumnos;
