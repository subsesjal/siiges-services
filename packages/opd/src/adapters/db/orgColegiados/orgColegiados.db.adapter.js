const { models, queries } = require('@siiges-services/core');

const {
  OrganoColegiado,
} = models;

const {
  createQuery,
  findOneQuery,
  findAllQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  createOrgColegiadoQuery: createQuery(OrganoColegiado),
  findOneOrgColegiadoQuery: findOneQuery(OrganoColegiado),
  findAllOrgColegiadosQuery: findAllQuery(OrganoColegiado),
  updateOrgColegiadoQuery: updateAndFindQuery(OrganoColegiado),
};
