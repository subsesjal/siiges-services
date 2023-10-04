const { createFormacionRector } = require('./create.formaciones-rectores.use-cases');
const { findAllFormacionRector } = require('./find-all.formaciones-rectores.use-cases');
const { findOneFormacionRector } = require('./find-one.formaciones-rectores.use-cases');
const { updateFormacionRector } = require('./update.formaciones-rectores.use-cases');

module.exports = {
  createFormacionRector,
  findAllFormacionRector,
  findOneFormacionRector,
  updateFormacionRector,
};
