// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Alumno,
  Calificacion,
  SolicitudBeca,
  SolicitudBecaAlumno,
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
};
