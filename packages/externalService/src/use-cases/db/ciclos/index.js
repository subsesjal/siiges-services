const { alumnos } = require('../../../adapters/db');

const findAllCiclos = require('./find-all.ciclos.use-cases');

module.exports = {
  findAllCiclos: findAllCiclos(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findAllCiclosEscolaresQuery,
  ),
};
