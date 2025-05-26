// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Alumno,
} = models;

const {
  createQuery,
} = queries;

module.exports = {
  createAlumnoQuery: createQuery(Alumno),
};
