const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  findOneQuery,
  updateAndFindQuery,
  findAllQuery,
  deleteAndFindQuery,
} = queries;

const {
  Alumno,
  AlumnoTipoTramite,
  Persona,
  Asignatura,
  Calificacion,
  AlumnoGrupo,
} = models;

module.exports = {
  findOneAlumnoQuery: findOneQuery(Alumno),
  findOneAlumnoTipoTramiteQuery: findOneQuery(AlumnoTipoTramite),
  createAlumnoQuery: createQuery(Alumno),
  createAlumnoGrupoQuery: createQuery(AlumnoGrupo),
  findOneAlumnoGrupoQuery: findOneQuery(AlumnoGrupo),
  createAlumnoTipoTramiteQuery: createQuery(AlumnoTipoTramite),
  updateAlumnoQuery: updateAndFindQuery(Alumno),
  updateAlumnoTipoTramiteQuery: updateAndFindQuery(AlumnoTipoTramite),
  updatePersonaQuery: updateAndFindQuery(Persona),
  deleteAlumnoQuery: deleteAndFindQuery(Alumno),
  deleteAlumnoTipoTramiteQuery: deleteAndFindQuery(AlumnoTipoTramite),
  deletePersonaQuery: deleteAndFindQuery(Persona),
  findAllAlumnosQuery: findAllQuery(Alumno),
  findOneAsignaturaQuery: findOneQuery(Asignatura),
  findOneCalificacionQuery: findOneQuery(Calificacion),
  createCalificacionQuery: createQuery(Calificacion),
  findAllCalificacionesQuery: findAllQuery(Calificacion),
  deleteCalificacionQuery: deleteAndFindQuery(Calificacion),
};
