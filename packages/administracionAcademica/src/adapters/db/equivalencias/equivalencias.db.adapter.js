const { models, queries } = require('@siiges-services/core');

const { Equivalencia } = models;

const { createQuery, updateAndFindQuery } = queries;

module.exports = {
  createEquivalenciaQuery: createQuery(Equivalencia),
  updateEquivalenciaQuery: updateAndFindQuery(Equivalencia),
};
