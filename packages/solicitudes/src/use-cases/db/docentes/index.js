const { docentes, asignaturas, solicitudes } = require('../../../adapters/db');
const create = require('./create.docente.use-cases');
const findOneDocente = require('./find-one.docente.use-cases');
const updateDocente = require('./update.docente.use-cases');
const findGroupDocentesPrograma = require('./find-group.docentes-programa.use-cases');
const deleteDocente = require('./delete.docente.use-cases');

module.exports = {
  createDocente: create(
    asignaturas.findOneAsignaturaQuery,
    docentes.createQuery,
    docentes.createAsignaturaDocenteQuery,
    docentes.findOneNivelQuery,
    docentes.createFormacionDocenteQuery,
  ),
  findOneDocente: findOneDocente(
    docentes.findOneDocenteQuery,
  ),
  updateDocente: updateDocente(
    docentes.findOneDocenteQuery,
    docentes.findAsignaturasDocentesQuery,
    docentes.findOneAsignaturaDocenteQuery,
    asignaturas.findOneAsignaturaQuery,
    docentes.updateDocenteQuery,
    docentes.updatePersonaQuery,
    docentes.createAsignaturaDocenteQuery,
    docentes.deleteAsignaturaDocenteQuery,
    docentes.updateFormacionDocenteQuery,
    docentes.createFormacionDocenteQuery,
  ),
  findGroupDocentesPrograma: findGroupDocentesPrograma(
    solicitudes.findOneProgramaQuery,
    docentes.findAllDocentesQuery,
  ),
  deleteDocente: deleteDocente(
    docentes.findOneDocenteQuery,
    docentes.findAsignaturasDocentesQuery,
    docentes.deleteAsignaturaDocenteQuery,
    docentes.deleteDocenteQuery,
  ),
};
