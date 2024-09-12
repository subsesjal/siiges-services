const createAsignaturaSchema = require('./create.asignatura-programa.schema');
const findOneAsignaturaSchema = require('./find-one.asignatura.schema');
const updateAsignaturaSchema = require('./update.asignatura.schema');
const deleteAsignaturaSchema = require('./delete.asignatura.schema');
const findProgramaAsignaturasSchema = require('./find.programa-asignaturas.schema');

module.exports = {
  createAsignaturaSchema,
  findOneAsignaturaSchema,
  updateAsignaturaSchema,
  deleteAsignaturaSchema,
  findProgramaAsignaturasSchema,
};
