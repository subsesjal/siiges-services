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
    { grupoId, asignaturaId },
    { include },
  );

  return calificacionesGrupo.map((calificacion) => calificacion.alumno.dataValues);
};

module.exports = findAlumnosGrupoAsignatura;
