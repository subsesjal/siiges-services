const { createCicloEscolarSchema } = require('./create.ciclos-escolares.schema');
const { deleteCicloEscolarSchema } = require('./delete.ciclos-escolares.schema');
const { findGroupCicloEscolarSchema } = require('./find-group.ciclos-escolares.schema');
const { findOneCicloEscolarSchema } = require('./find-one.ciclos-escolares.schema');
const { updateCicloEscolarSchema } = require('./update.ciclos-escolares.schema');

module.exports = {
  createCicloEscolarSchema,
  deleteCicloEscolarSchema,
  findGroupCicloEscolarSchema,
  findOneCicloEscolarSchema,
  updateCicloEscolarSchema,
};
