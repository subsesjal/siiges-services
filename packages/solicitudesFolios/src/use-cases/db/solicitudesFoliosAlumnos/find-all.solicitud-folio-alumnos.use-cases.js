const findAllSolicitudFolioAlumnos = (
  findAllSolicitudFolioAlumnosQuery,
) => async (query) => {
  const include = [
    {
      association: 'alumno',
      include: [{ association: 'persona' }],
    },
    {
      association: 'folioDocumentoAlumno',
      include: [
        { association: 'foja' },
        { association: 'libro' },
      ],
    },
  ];

  const solicitudesFoliosAlumnos = await findAllSolicitudFolioAlumnosQuery(
    query,
    { include, strict: false },
  );

  return solicitudesFoliosAlumnos;
};

module.exports = findAllSolicitudFolioAlumnos;
