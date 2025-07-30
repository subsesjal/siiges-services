const { alumnos } = require('../../../adapters/db');

const findAllCiclos = require('./find-all.ciclos.use-cases');
const createCicloEscolar = require('./create.ciclo.use-case');

module.exports = {
  findAllCiclos: findAllCiclos(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findAllCiclosEscolaresQuery,
  ),
  createCicloEscolar: createCicloEscolar(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findOneCiclosEscolaresQuery,
    alumnos.createCicloEscolarQuery,
  ),
};
