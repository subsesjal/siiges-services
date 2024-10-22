const { models, queries } = require('@siiges-services/core');
const { Op } = require('sequelize');

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

const where = {
  nombre: { [Op.not]: 'EQUIV' },
};

module.exports = {
  findOneProgramaQuery: findOneQuery(Programa),
  createCicloEscolarQuery: createQuery(CicloEscolar),
  findOneCicloEscolarQuery: findOneQuery(CicloEscolar),
  findGroupCicloEscolarQuery: findAllQuery(CicloEscolar),
  updateCicloEscolarQuery: updateAndFindQuery(CicloEscolar),
  deleteCicloEscolarQuery: deleteAndFindQuery(CicloEscolar),
  whereCicloEscolarQuery: where,
};
