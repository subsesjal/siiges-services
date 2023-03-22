const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  findOneQuery,
  updateQuery,
} = queries;

const { Docente, AsignaturaDocente } = models;

module.exports = {
  findOneDocenteQuery: findOneQuery(Docente),
  createQuery: createQuery(Docente),
  createAsignaturaDocenteQuery: createQuery(AsignaturaDocente),
  updateDocenteQuery: updateQuery(Docente),
};
