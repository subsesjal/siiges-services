const { createGrupoSchema } = require('./create.grupos.schema');
const { deleteGrupoSchema } = require('./delete.grupos.schema');
const { findGroupGrupoSchema } = require('./find-group.grupos.schema');
const { findOneGrupoSchema } = require('./find-one.grupos.schema');
const { updateGrupoSchema } = require('./update.grupos.schema');

module.exports = {
  createGrupoSchema,
  deleteGrupoSchema,
  findGroupGrupoSchema,
  findOneGrupoSchema,
  updateGrupoSchema,
};
