const { programas } = require('../../../adapters/db');

const findAllProgramas = require('./find-all.programas.use-cases');
const findPlantelProgramas = require('./find-plantel.programas.use-cases');

module.exports = {
  findAllProgramas: findAllProgramas(
    programas.findAllProgramaQuery,
    programas.includeProgramasQuery,
    programas.whereProgramasQuery,
  ),
  findPlantelProgramas: findPlantelProgramas(
    programas.findPlantelProgramasQuery,
    programas.includeProgramasQuery,
    programas.whereProgramasQuery,
  ),
};
