// Internal dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Usuario,
} = models;

const {
  findOneQuery,
} = queries;

module.exports = {
  findOneUserQuery: findOneQuery(Usuario),
};
