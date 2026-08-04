const { models, queries } = require('@siiges-services/core');

const {
  Programa,
  CicloEscolar,
  CatalogoCicloEscolar,
} = models;

const {
  createQuery,
  findAllQuery,
  findOneQuery,
  updateAndFindQuery,
  deleteAndFindQuery,
} = queries;

module.exports = {
  findOneProgramaQuery: findOneQuery(Programa),
  createCicloEscolarQuery: createQuery(CicloEscolar),
  findOneCicloEscolarQuery: findOneQuery(CicloEscolar),
  findGroupCicloEscolarQuery: findAllQuery(CicloEscolar),
  findCatalogoCicloEscolarQuery: findAllQuery(CatalogoCicloEscolar),
  updateCicloEscolarQuery: updateAndFindQuery(CicloEscolar),
  deleteCicloEscolarQuery: deleteAndFindQuery(CicloEscolar),
};
