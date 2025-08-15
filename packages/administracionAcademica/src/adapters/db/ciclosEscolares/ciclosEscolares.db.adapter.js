const { models, queries } = require('@siiges-services/core');

const {
  Programa,
  CicloEscolar,
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
  updateCicloEscolarQuery: updateAndFindQuery(CicloEscolar),
  deleteCicloEscolarQuery: deleteAndFindQuery(CicloEscolar),
};
