// External dependencies
const { models, queries } = require('@siiges-services/core');

const { TokenExterno } = models;

const {
  createQuery,
  findOneQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  createTokenExternoQuery: createQuery(TokenExterno),
  findOneTokenExternoQuery: findOneQuery(TokenExterno),
  updateTokenExternoQuery: updateAndFindQuery(TokenExterno),
};
