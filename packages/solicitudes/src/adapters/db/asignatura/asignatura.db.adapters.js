// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Asignatura,
} = models;

const {
  findOneQuery,
} = queries;

module.exports = {
  findOneAsignaturaQuery: findOneQuery(Asignatura),
};
