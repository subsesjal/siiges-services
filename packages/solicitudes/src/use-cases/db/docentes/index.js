const { docentes, asignaturas } = require('../../../adapters/db');
const create = require('./create.docente.use-cases');
const findOneDocente = require('./find-one.docente.use-cases');

module.exports = {
  createDocente: create(
    asignaturas.findOneAsignaturaQuery,
    docentes.createQuery,
    docentes.createAsignaturaDocenteQuery,
  ),
  findOneDocente: findOneDocente(
    docentes.findOneDocenteQuery,
  ),
};
