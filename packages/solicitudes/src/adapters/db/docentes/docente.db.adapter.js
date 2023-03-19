const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  findOneQuery,
} = queries;

const { Docente, AsignaturaDocente } = models;

module.exports = {
  findOneDocenteQuery: findOneQuery(Docente),
  createQuery: createQuery(Docente),
  createAsignaturaDocenteQuery: createQuery(AsignaturaDocente),
};
