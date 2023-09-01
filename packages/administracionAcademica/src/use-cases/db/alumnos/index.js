const { alumnos, programas } = require('../../../adapters/db');
const createAlumno = require('./create.alumno.use-cases');
const findOneAlumno = require('./find-one.alumno.use-cases');
const updateAlumno = require('./update.alumno.use-cases');
const findGroupAlumnosPrograma = require('./find-group.alumnos-programa.use-cases');
const deleteAlumno = require('./delete.alumno.use-cases');

module.exports = {
  createAlumno: createAlumno(
    alumnos.findOneAlumnoQuery,
    programas.findOneProgramaQuery,
    alumnos.createAlumnoQuery,
    alumnos.createAlumnoTipoTramiteQuery,
  ),
  findOneAlumno: findOneAlumno(
    alumnos.findOneAlumnoQuery,
  ),
  updateAlumno: updateAlumno(
    alumnos.findOneAlumnoQuery,
    alumnos.findOneAlumnoTipoTramiteQuery,
    alumnos.createAlumnoTipoTramiteQuery,
    alumnos.updateAlumnoQuery,
    alumnos.updateAlumnoTipoTramiteQuery,
    alumnos.updatePersonaQuery,
  ),
  findGroupAlumnosPrograma: findGroupAlumnosPrograma(
    programas.findOneProgramaQuery,
    alumnos.findAllAlumnosQuery,
  ),
  deleteAlumno: deleteAlumno(
    alumnos.findOneAlumnoQuery,
    alumnos.findOneAlumnoTipoTramiteQuery,
    alumnos.deleteAlumnoQuery,
    alumnos.deleteAlumnoTipoTramiteQuery,
    alumnos.deletePersonaQuery,
  ),
};
