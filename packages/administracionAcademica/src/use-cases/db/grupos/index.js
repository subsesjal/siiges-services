const { grupos } = require('../../../adapters/db');

const { createGrupo } = require('./create.grupo.use-case');
const { findOneGrupo } = require('./find-one.grupo.use-case');
const { findGroupGrupo } = require('./find-group.grupo.use-case');
const { updateGrupo } = require('./update.grupo.use-case');
const { deleteGrupo } = require('./delete.grupo.use-case');

const findGrupo = findOneGrupo(
  grupos.findOneGrupoQuery,
);

module.exports = {
  createGrupo: createGrupo(
    grupos.findOneGrupoQuery,
    grupos.findOneCicloEscolarQuery,
    grupos.findOneTurnoQuery,
    grupos.findOneGradoQuery,
    grupos.createGrupoQuery,
  ),
  findOneGrupo: findGrupo,
  findGroupGrupo: findGroupGrupo(
    grupos.findGroupGrupoQuery,
  ),
  updateGrupo: updateGrupo(
    grupos.findOneCicloEscolarQuery,
    grupos.findOneTurnoQuery,
    grupos.findOneGradoQuery,
    grupos.updateGrupoQuery,
    grupos.findOneGrupoQuery,
  ),
  deleteGrupo: deleteGrupo(
    findGrupo,
    grupos.deleteGrupoQuery,
  ),
};
