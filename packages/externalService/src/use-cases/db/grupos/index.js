const { alumnos } = require('../../../adapters/db');

const findAllGrupos = require('./find-all.grupos.use-cases');
const createGrupo = require('./create.grupo.use-case');

module.exports = {
  findAllGrupos: findAllGrupos(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findAllGrupoQuery,
  ),
  createGrupo: createGrupo(
    alumnos.findOneUserUsersQuery,
    alumnos.findOneProgramaQuery,
    alumnos.findOneCiclosEscolaresQuery,
    alumnos.findOneGradoQuery,
    alumnos.findOneTurnoQuery,
    alumnos.findOneGrupoQuery,
    alumnos.createGrupoQuery,
  ),
};
