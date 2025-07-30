const { alumnos } = require('../../../adapters/db');

const findAllGrupos = require('./find-all.grupos.use-cases');
const createCicloEscolar = require('./create.ciclo.use-case');

module.exports = {
  findAllGrupos: findAllGrupos(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findAllGrupoQuery,
  ),
  createCicloEscolar: createCicloEscolar(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findOneCiclosEscolaresQuery,
    alumnos.createCicloEscolarQuery,
  ),
};
