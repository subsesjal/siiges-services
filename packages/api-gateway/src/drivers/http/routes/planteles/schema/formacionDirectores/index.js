const { createFormacionDirectorSchema } = require('./create.formacion-director.schema');
const { updateFormacionDirectorSchema } = require('./update.formacion-director.schema');
const { findAllFormacionDirectorSchema } = require('./find-all.formacion-director.schema');
const { findOneFormacionDirectorSchema } = require('./find-one.formacion-director.schema');

module.exports = {
  createFormacionDirectorSchema,
  updateFormacionDirectorSchema,
  findAllFormacionDirectorSchema,
  findOneFormacionDirectorSchema,
};
