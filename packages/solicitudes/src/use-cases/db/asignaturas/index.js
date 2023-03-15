const { asignaturas } = require('../../../adapters/db');

const createAsignaturaPrograma = require('./create.asignatura.use-cases');
const findOneAsignatura = require('./find-one.asignatura.use-cases');
const deleteAsignatura = require('./delete.asignatura.use-cases');

module.exports = {
  createAsignaturaPrograma: createAsignaturaPrograma(
    asignaturas.findProgramaQuery,
    asignaturas.createAsignaturaProgramaQuery,
  ),
  findOneAsignatura: findOneAsignatura(
    asignaturas.findOneAsignaturaQuery,
  ),
  deleteAsignatura: deleteAsignatura(
    asignaturas.findOneAsignaturaQuery,
    asignaturas.deleteAsignaturaQuery,
  ),
};
