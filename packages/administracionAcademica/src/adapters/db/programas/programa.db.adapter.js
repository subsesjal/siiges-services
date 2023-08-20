const { models, queries } = require('@siiges-services/core');

const {
  findOneQuery,
} = queries;

const {
  Programa,
} = models;

module.exports = {
  findOneProgramaQuery: findOneQuery(Programa),
};
