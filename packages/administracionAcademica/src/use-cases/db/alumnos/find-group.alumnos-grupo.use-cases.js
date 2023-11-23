const findAlumnosGrupoAsignatura = (findAllCalificacionesQuery) => async ({
  grupoId,
  asignaturaId,
}) => {
  const include = [
    {
      association: 'alumno',
      include: [
        { association: 'persona' },
        { association: 'situacion' },
      ],
    }];

  const calificacionesGrupo = await findAllCalificacionesQuery(
    { grupoId, asignaturaId, tipo: 1 },
    { include },
  );

  const alumnos = await Promise.all(calificacionesGrupo
    .filter((calificacion) => calificacion.tipo === 1)
    .map(async ({ alumno }) => {
      const alumnoJson = alumno.toJSON();
      const calificacionesAlumno = await findAllCalificacionesQuery(
        { alumnoId: alumnoJson.id, grupoId, asignaturaId },
      );
      return {
        ...alumnoJson,
        calificaciones: calificacionesAlumno,
      };
    }));

  return alumnos;
};

module.exports = findAlumnosGrupoAsignatura;
