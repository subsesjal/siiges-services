const { createCicloEscolar } = require('./create.handlers.ciclo-escolar.adapters');
const { deleteCicloEscolar } = require('./delete.handlers.ciclo-escolar.adapters');
const { updateCicloEscolar } = require('./update.handlers.ciclo-escolar.adapters');
const { findGroupCicloEscolar } = require('./find-group.handlers.ciclo-escolar.adapters');
const { findOneCicloEscolar } = require('./find-one.handlers.ciclo-escolar.adapters');

module.exports = {
  createCicloEscolar,
  deleteCicloEscolar,
  updateCicloEscolar,
  findGroupCicloEscolar,
  findOneCicloEscolar,
};
