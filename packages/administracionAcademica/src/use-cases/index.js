const {
  createAlumno,
  findOneAlumno,
  updateAlumno,
  findGroupAlumnosPrograma,
  deleteAlumno,
  alumnosInscripcion,
} = require('./db/alumnos');

const {
  findAllProgramas,
  findPlantelProgramas,
  findInstitucionProgramas,
} = require('./db/programas');

const {
  createCicloEscolar,
  deleteCicloEscolar,
  findGroupCicloEscolar,
  findOneCicloEscolar,
  updateCicloEscolar,
} = require('./db/ciclosEscolares');

const {
  createGrupo,
  findOneGrupo,
  findGroupGrupo,
  updateGrupo,
  deleteGrupo,
} = require('./db/grupos');

module.exports = {
  createAlumno,
  findOneAlumno,
  updateAlumno,
  findGroupAlumnosPrograma,
  deleteAlumno,
  findAllProgramas,
  findPlantelProgramas,
  findInstitucionProgramas,
  createCicloEscolar,
  deleteCicloEscolar,
  findGroupCicloEscolar,
  findOneCicloEscolar,
  updateCicloEscolar,
  createGrupo,
  findOneGrupo,
  findGroupGrupo,
  updateGrupo,
  deleteGrupo,
  alumnosInscripcion,
};
