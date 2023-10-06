const { ciclosEscolares } = require('../../../adapters/db');

const { createCicloEscolar } = require('./create.ciclo-escolar.use-cases');
const { findGroupCicloEscolar } = require('./find-group.ciclo-escolar.use-cases');
const { findOneCicloEscolar } = require('./find-one.ciclo-escolar.use-cases');
const { updateCicloEscolar } = require('./update.ciclo-escolar.use-cases');
const { deleteCicloEscolar } = require('./delete.ciclo-escolar.use-cases');

const findCicloEscolar = findOneCicloEscolar(ciclosEscolares.findOneCicloEscolarQuery);

module.exports = {
  createCicloEscolar: createCicloEscolar(
    ciclosEscolares.findOneProgramaQuery,
    ciclosEscolares.createCicloEscolarQuery,
  ),
  findGroupCicloEscolar: findGroupCicloEscolar(
    ciclosEscolares.findGroupCicloEscolarQuery,
  ),
  findOneCicloEscolar: findCicloEscolar,
  updateCicloEscolar: updateCicloEscolar(
    findCicloEscolar,
    ciclosEscolares.findOneProgramaQuery,
    ciclosEscolares.updateCicloEscolarQuery,
  ),
  deleteCicloEscolar: deleteCicloEscolar(
    findCicloEscolar,
    ciclosEscolares.deleteCicloEscolarQuery,
  ),
};
