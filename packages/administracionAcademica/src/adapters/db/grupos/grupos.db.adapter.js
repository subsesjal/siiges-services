const { models, queries } = require('@siiges-services/core');

const {
  CicloEscolar,
  Turno,
  Grado,
  Grupo,
} = models;

const {
  createQuery,
  findAllQuery,
  findOneQuery,
  updateAndFindQuery,
  deleteAndFindQuery,
} = queries;

module.exports = {
  findOneCicloEscolarQuery: findOneQuery(CicloEscolar),
  findOneTurnoQuery: findOneQuery(Turno),
  findOneGradoQuery: findOneQuery(Grado),
  findOneGrupoQuery: findOneQuery(Grupo),
  createGrupoQuery: createQuery(Grupo),
  findGroupGrupoQuery: findAllQuery(Grupo),
  updateGrupoQuery: updateAndFindQuery(Grupo),
  deleteGrupoQuery: deleteAndFindQuery(Grupo),
};
