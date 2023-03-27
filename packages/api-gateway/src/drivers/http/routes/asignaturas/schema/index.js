const createAsignaturaSchema = require('./create.asignatura-programa.schema');
const findOneAsignaturaSchema = require('./find.one.asignatura.schema');
const updateAsignaturasSchema = require('./update.asignaturas.schema');
const deleteAsignaturaSchema = require('./delete.asignatura.schema');
const findProgramaAsignaturasSchema = require('./find.programa-asignaturas.schema');

module.exports = {
  createAsignaturaSchema,
  findOneAsignaturaSchema,
  updateAsignaturasSchema,
  deleteAsignaturaSchema,
  findProgramaAsignaturasSchema,
};
