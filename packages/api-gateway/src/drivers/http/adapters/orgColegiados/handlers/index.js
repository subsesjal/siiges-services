const { createOrgColegiado } = require('./create.handlers.organo-colegiado.adapters');
const { findOneOrgColegiado } = require('./find-one.handlers.organo-colegiado.adapters');
const { findGroupOrgColegiados } = require('./find-group.handlers.organo-colegiado.adapters');
const { updateOrgColegiado } = require('./update.handlers.organo-colegiado.adapters');

module.exports = {
  createOrgColegiado,
  findOneOrgColegiado,
  findGroupOrgColegiados,
  updateOrgColegiado,
};
