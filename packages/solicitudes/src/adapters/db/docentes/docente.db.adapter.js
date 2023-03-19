const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
} = queries;

const { Docente, AsignaturaDocente } = models;

module.exports = {
  createQuery: createQuery(Docente),
  createAsignaturaDocenteQuery: createQuery(AsignaturaDocente),
};
