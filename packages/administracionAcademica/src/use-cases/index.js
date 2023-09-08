const {
  createAlumno,
  findOneAlumno,
  updateAlumno,
  findGroupAlumnosPrograma,
  deleteAlumno,
} = require('./db/alumnos');

const {
  findAllProgramas,
  findPlantelProgramas,
  findInstitucionProgramas,
} = require('./db/programas');

module.exports = {
  createAlumno,
  findOneAlumno,
  updateAlumno,
  findGroupAlumnosPrograma,
  deleteAlumno,
  findAllProgramas,
  findPlantelProgramas,
  findInstitucionProgramas,
};
