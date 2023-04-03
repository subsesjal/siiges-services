const { models, queries } = require('@siiges-services/core');

const {
  updateQuery,
} = queries;

const {
  higiene,
} = models;

module.exports = {
  updateHigieneQuery: updateQuery(higiene),
};
