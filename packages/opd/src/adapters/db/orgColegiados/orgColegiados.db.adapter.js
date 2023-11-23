const { models, queries } = require('@siiges-services/core');

const {
  OrganoColegiado,
} = models;

const {
  createQuery,
} = queries;

module.exports = {
  createOrgColegiadoQuery: createQuery(OrganoColegiado),
};
