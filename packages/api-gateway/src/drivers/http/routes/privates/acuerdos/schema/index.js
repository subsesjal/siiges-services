const { createAcuerdoSchema } = require('./create.acuerdo.schema');
const { findOneAcuerdoSchema } = require('./find-one.acuerdo.schema');
const { findGroupAcuerdosSchema } = require('./find-group.acuerdos.schema');
const { updateAcuerdoSchema } = require('./update.acuerdo.schema');

module.exports = {
  createAcuerdoSchema,
  findOneAcuerdoSchema,
  findGroupAcuerdosSchema,
  updateAcuerdoSchema,
};
