const { createFormacionDirector } = require('./create.handlers.formacion-director.adapters');
const { findAllFormacionDirector } = require('./find-all.handlers.formacion-director.adapters');
const { findOneFormacionDirector } = require('./find-one.handlers.formacion-director.adapters');
const { updateFormacionDirector } = require('./update.handlers.formacion-director.adapters');

module.exports = {
  createFormacionDirector,
  findAllFormacionDirector,
  findOneFormacionDirector,
  updateFormacionDirector,
};
