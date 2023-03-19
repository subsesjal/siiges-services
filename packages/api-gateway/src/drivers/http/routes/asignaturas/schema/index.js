const createAsignaturaSchema = require('./create.asignatura-programa.schema');
const findOneAsignaturaSchema = require('./find.one.asignatura.schema');
const deleteAsignaturaSchema = require('./delete.asignatura.schema');
const findProgramaAsignaturasSchema = require('./find.programa-asignaturas.schema');

// exports
module.exports = {
  createAsignaturaSchema,
  findOneAsignaturaSchema,
  deleteAsignaturaSchema,
  findProgramaAsignaturasSchema,
};
