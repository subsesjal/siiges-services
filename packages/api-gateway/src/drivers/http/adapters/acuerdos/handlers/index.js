const { createAcuerdo } = require('./create.handlers.acuerdo.adapters');
const { findOneAcuerdo } = require('./find-one.handlers.acuerdo.adapters');
const { findGroupAcuerdos } = require('./find-group.handlers.acuerdos.adapters');
const { updateAcuerdo } = require('./update.handlers.acuerdo.adapters');

module.exports = {
  createAcuerdo,
  findGroupAcuerdos,
  findOneAcuerdo,
  updateAcuerdo,
};
