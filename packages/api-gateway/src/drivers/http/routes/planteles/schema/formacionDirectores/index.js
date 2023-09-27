const { createFormacionDirectorSchema } = require('./create.formacion-rector.schema');
const { updateFormacionDirectorSchema } = require('./update.formacion-rector.schema');
const { findAllFormacionDirectorSchema } = require('./find-all.formacion-rector.schema');
const { findOneFormacionDirectorSchema } = require('./find-one.formacion-rector.schema');

module.exports = {
  createFormacionDirectorSchema,
  updateFormacionDirectorSchema,
  findAllFormacionDirectorSchema,
  findOneFormacionDirectorSchema,
};
