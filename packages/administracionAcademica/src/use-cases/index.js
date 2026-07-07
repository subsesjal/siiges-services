const alumnos = require('./db/alumnos');
const titulosElectronicos = require('./db/titulosElectronicos');
const certificadosElectronicos = require('./db/certificadosElectronicos');

const {
  findAllProgramas,
  findPlantelProgramas,
  findInstitucionProgramas,
  findOnePrograma,
  findOneProgramaRvoe,
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

const {
  createEquivalenciaInterna,
  updateEquivalenciaInterna,
} = require('./db/equivalencias');

const grados = require('./db/grados');

const validaciones = require('./db/validaciones');

module.exports = {
  findAllProgramas,
  findPlantelProgramas,
  findInstitucionProgramas,
  findOnePrograma,
  createCicloEscolar,
  deleteCicloEscolar,
  findGroupCicloEscolar,
  findOneCicloEscolar,
  updateCicloEscolar,
  createGrupo,
  findOneGrupo,
  findGroupGrupo,
  createEquivalenciaInterna,
  updateEquivalenciaInterna,
  updateGrupo,
  deleteGrupo,
  ...alumnos,
  ...grados,
  ...validaciones,
  ...titulosElectronicos,
  ...certificadosElectronicos,
  findOneProgramaRvoe,
};
