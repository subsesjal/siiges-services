// External dependencies
const { drivers, queries } = require('@siiges-services/core');

const { Vigilancia } = drivers.sequelize.models;

const { findAllQuery } = queries;

module.exports = {
  findAllVigilanciasQuery: findAllQuery(Vigilancia),
};
