const { programas } = require('../../../adapters/db');

const findAllProgramas = require('./find-all.programas.use-cases');
const { findPlantelProgramas } = require('./find-plantel.programas.use-cases');
const findInstitucionProgramas = require('./find-institucion.programas.use-cases');
const findOnePrograma = require('./find-one.programa.use-cases');

module.exports = {
  findAllProgramas: findAllProgramas(
    programas.findAllProgramasQuery,
    programas.findOneProgramaQuery,
    programas.includeProgramasQuery,
    programas.whereProgramasQuery,
  ),
  findPlantelProgramas: findPlantelProgramas(
    programas.findPlantelProgramasQuery,
    programas.includeProgramasQuery,
    programas.whereProgramasQuery,
  ),
  findInstitucionProgramas: findInstitucionProgramas(
    programas.findInstitucionQuery,
    [
      programas.findPlantelProgramasQuery,
      programas.includeProgramasQuery,
      programas.whereProgramasQuery,
    ],
  ),
  findOnePrograma: findOnePrograma(
    programas.findOneProgramaQuery,
    programas.includeProgramasQuery,
  ),
};
