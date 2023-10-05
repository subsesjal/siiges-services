const { createFormacionDirector } = require('./create.formaciones-directores.use-cases');
const { findAllFormacionDirector } = require('./find-all.formaciones-directores.use-cases');
const { findOneFormacionDirector } = require('./find-one.formaciones-directores.use-cases');
const { updateFormacionDirector } = require('./update.formaciones-directores.use-cases');

module.exports = {
  createFormacionDirector,
  findAllFormacionDirector,
  findOneFormacionDirector,
  updateFormacionDirector,
};
