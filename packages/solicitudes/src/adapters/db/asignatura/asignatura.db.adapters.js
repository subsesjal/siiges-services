// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Asignatura,
} = models;

const {

  createQuery,

} = queries;

module.exports = {
  createAsignaturaProgramaQuery: createQuery(Asignatura),
};
