const { createGrupo } = require('./create.handlers.grupo.adapters');
const { deleteGrupo } = require('./delete.handlers.grupo.adapters');
const { findGroupGrupo } = require('./find-group.handlers.grupo.adapters');
const { findOneGrupo } = require('./find-one.handlers.grupo.adapters');
const { updateGrupo } = require('./update.handlers.grupo.adapters');

module.exports = {
  createGrupo,
  deleteGrupo,
  findGroupGrupo,
  findOneGrupo,
  updateGrupo,
};
