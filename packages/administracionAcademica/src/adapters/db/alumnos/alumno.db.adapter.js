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
} = models;

module.exports = {
  findOneAlumnoQuery: findOneQuery(Alumno),
  findOneAlumnoTipoTramiteQuery: findOneQuery(AlumnoTipoTramite),
  createAlumnoQuery: createQuery(Alumno),
  createAlumnoTipoTramiteQuery: createQuery(AlumnoTipoTramite),
  updateAlumnoQuery: updateAndFindQuery(Alumno),
  updateAlumnoTipoTramiteQuery: updateAndFindQuery(AlumnoTipoTramite),
  updatePersonaQuery: updateAndFindQuery(Persona),
  deleteAlumnoQuery: deleteAndFindQuery(Alumno),
  deleteAlumnoTipoTramiteQuery: deleteAndFindQuery(AlumnoTipoTramite),
  deletePersonaQuery: deleteAndFindQuery(Persona),
  findAllAlumnosQuery: findAllQuery(Alumno),
};
