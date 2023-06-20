const createAsignaturaPrograma = require('./create.handlers.asignatura-programa.adapters');
const findOneAsignaturaPrograma = require('./find-one.handlers.asignatura.adapters');
const updateAsignatura = require('./update.handlers.asignatura.adapters');
const deleteAsignaturaPrograma = require('./delete.handlers.asignatura-programa.adapters');
const findProgramaAsignaturas = require('./find.handlers.programa-asignaturas.adapters');
const createAsignaturaElectivaPrograma = require('./create.handlers.asignaturaElectiva-programa.adapters');

module.exports = {
  createAsignaturaPrograma,
  findOneAsignaturaPrograma,
  updateAsignatura,
  deleteAsignaturaPrograma,
  findProgramaAsignaturas,
  createAsignaturaElectivaPrograma,
};
