const createAlumnoSchema = require('./create.alumno.schema');
const findOneAlumnoSchema = require('./find-one.alumno.schema');
const updateAlumnoSchema = require('./update.alumno.schema');
const deleteAlumnoSchema = require('./delete.alumno.schema');
const findProgramaAlumnosSchema = require('./find.programa-alumnos.schema');
const alumnosInscripcionSchema = require('./alumnos-inscripcion.schema');
const { findAlumnosInscritosSchema } = require('./find-group.alumno-inscrito.schema');

module.exports = {
  createAlumnoSchema,
  findOneAlumnoSchema,
  updateAlumnoSchema,
  deleteAlumnoSchema,
  findProgramaAlumnosSchema,
  alumnosInscripcionSchema,
  findAlumnosInscritosSchema,
};
