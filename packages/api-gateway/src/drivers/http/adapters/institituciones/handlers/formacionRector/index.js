const { createFormacionRector } = require('./create.handlers.formacion-rector.adapters');
const { findAllFormacionRector } = require('./find-all.handlers.formacion-rector.adapters');
const { findOneFormacionRector } = require('./find-one.handlers.formacion-rector.adapters');
const { updateFormacionRector } = require('./update.handlers.formacion-rector.adapters');

module.exports = {
  createFormacionRector,
  findAllFormacionRector,
  findOneFormacionRector,
  updateFormacionRector,
};
