// External dependencies
const { models, queries } = require('@siiges-services/core');

const { Vigilancia } = models;

const { findAllQuery } = queries;

module.exports = {
  findAllVigilanciasQuery: findAllQuery(Vigilancia),
};
