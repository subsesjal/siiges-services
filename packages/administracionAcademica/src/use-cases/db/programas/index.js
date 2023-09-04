const { programas } = require('../../../adapters/db');

const findAllProgramas = require('./find-all.programas.use-cases');

module.exports = {
  findAllProgramas: findAllProgramas(
    programas.findAllProgramaQuery,
  ),
};
