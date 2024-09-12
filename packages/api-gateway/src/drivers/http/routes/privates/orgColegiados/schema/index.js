const { createOrgColegiadoSchema } = require('./create.organos-colegiados.schema');
const { findOneOrgColegiadoSchema } = require('./find-one.organo-colegiado.schema');
const { findGroupOrgColegiadosSchema } = require('./find-group.organos-colegiados.schema');
const { updateOrgColegiadoSchema } = require('./update.organos-colegiados.schema');

module.exports = {
  createOrgColegiadoSchema,
  findOneOrgColegiadoSchema,
  findGroupOrgColegiadosSchema,
  updateOrgColegiadoSchema,
};
