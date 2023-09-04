const { models, queries } = require('@siiges-services/core');

const {
  findAllQuery,
} = queries;

const {
  Programa,
} = models;

module.exports = {
  findAllProgramaQuery: findAllQuery(Programa),
};
