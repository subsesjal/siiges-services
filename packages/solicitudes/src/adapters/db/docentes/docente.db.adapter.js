const { models, queries } = require('@siiges-services/core');

const {
  createQuery,
  findOneQuery,
  updateAndFindQuery,
  findAllQuery,
  deleteAndFindQuery,
} = queries;

const {
  Docente,
  AsignaturaDocente,
  Persona,
  FormacionDocente,
  Formacion,
  Nivel,
} = models;

module.exports = {
  findOneDocenteQuery: findOneQuery(Docente),
  findOneAsignaturaDocenteQuery: findOneQuery(AsignaturaDocente),
  findAsignaturasDocentesQuery: findAllQuery(AsignaturaDocente),
  createQuery: createQuery(Docente),
  createAsignaturaDocenteQuery: createQuery(AsignaturaDocente),
  updateDocenteQuery: updateAndFindQuery(Docente),
  updatePersonaQuery: updateAndFindQuery(Persona),
  deleteAsignaturaDocenteQuery: deleteAndFindQuery(AsignaturaDocente),
  deleteDocenteQuery: deleteAndFindQuery(Docente),
  findAllDocentesQuery: findAllQuery(Docente),
  findOneNivelQuery: findOneQuery(Nivel),
  createFormacionDocenteQuery: createQuery(FormacionDocente),
  updateFormacionDocenteQuery: updateAndFindQuery(Formacion),
};
