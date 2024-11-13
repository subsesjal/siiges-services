// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Alumno,
  Calificacion,
} = models;

const {
  findOneQuery,
  findAllQuery,
} = queries;

module.exports = {
  findOneAlumnoQuery: findOneQuery(Alumno),
  findAllCalificacionesQuery: findAllQuery(Calificacion),
};
