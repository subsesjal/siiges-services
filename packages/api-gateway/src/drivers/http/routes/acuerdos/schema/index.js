const { createOrgColegiadoSchema } = require('./create.acuerdo.schema');
const { findOneOrgColegiadoSchema } = require('./find-one.acuerdo.schema');
const { findGroupOrgColegiadosSchema } = require('./find-group.acuerdos.schema');
const { updateOrgColegiadoSchema } = require('./update.acuerdo.schema');

module.exports = {
  createOrgColegiadoSchema,
  findOneOrgColegiadoSchema,
  findGroupOrgColegiadosSchema,
  updateOrgColegiadoSchema,
};
