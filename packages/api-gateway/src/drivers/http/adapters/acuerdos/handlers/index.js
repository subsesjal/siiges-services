const { createAcuerdo } = require('./create.handlers.acuerdo.adapters');
const { findOneAcuerdo } = require('./find-one.handlers.acuerdo.adapters');
const { findGroupAcuerdo } = require('./find-group.handlers.acuerdos.adapters');
const { updateAcuerdo } = require('./update.handlers.acuerdo.adapters');

module.exports = {
  createAcuerdo,
  findGroupAcuerdo,
  findOneAcuerdo,
  updateAcuerdo,
};
