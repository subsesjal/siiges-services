// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Alumno,
  Calificacion,
  SolicitudBeca,
  SolicitudBecaAlumno,
  SolicitudServicioSocial,
  SolicitudServicioSocialAlumno,
} = models;

const {
  findOneQuery,
  findAllQuery,
} = queries;

module.exports = {
  findOneAlumnoQuery: findOneQuery(Alumno),
  findAllCalificacionesQuery: findAllQuery(Calificacion),
  findOneSolicitudBecaQuery: findOneQuery(SolicitudBeca),
  findAllSolicitudBecaAlumnoQuery: findAllQuery(SolicitudBecaAlumno),
  findOneSolicitudServSocQuery: findOneQuery(SolicitudServicioSocial),
  findAllSolicitudServSocAlumnoQuery: findAllQuery(SolicitudServicioSocialAlumno),
};
